const userSchema = require('../../modules/user')
const bcrypt = require('bcrypt');
const productSchema = require('../../modules/product')
const orderSchema = require('../../modules/order')
const cartSchema = require('../../modules/cart')
const { createToken } = require('../../auth/createToken')
const blogSchema = require('../../modules/blogpost')
class service {
    static signup = async ({ username, email, password, address,phone }) => {
        const checkEmail = await userSchema.findOne({ email: email });
        if (checkEmail) return { status: 401, message: 'Tài khoản đã tồn tại' }
        console.log(checkEmail);
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await userSchema.create({
            username,
            email,
            password: passwordHash,
            address,
            phone
        })
        if (newUser) return {
            message: 'Đăng ký tài khoản thành công !!!',
            status: 200,
            newUser
        }
    }
    static login = async ({ email, password }) => {
        const checkEmail = await userSchema.findOne({ email: email });
        if (!checkEmail) return {  status: 401,message: 'Tài khoản không tồn tại' }
        const match = await bcrypt.compare(password, checkEmail.password);
        if (!match) return {status: 401 , message: 'Sai mật khẩu' }
        const token = await createToken(checkEmail._id, checkEmail.username,checkEmail.role)
        return {
            message: 'Đăng nhập thành công !!!',
            status: 200,
            token
        }
    }
    static getAllProduct = async () => { 
        const product = await productSchema.find().lean();
        return product;
    }
    static getProductByID = async (req) => { 
        const product = await productSchema.findOne(req.body._id).lean();
        return product;
    }
    static payOneProduct = async ({ userID, _id, quantity }) => { 
        const product = await productSchema.findOne({ _id: _id });
        if(!product) return {message: "Product not found"}
        const newStockQuantity = product.stockQuantity - quantity;
        const updateOneProduct = await productSchema.findOneAndUpdate({ _id: _id }, {
            $set: {soldQuantity: quantity,stockQuantity: newStockQuantity}
        })
        const priceProduct = product.price * quantity;
        const newOrder = await orderSchema.create({
            user: userID,
            products: [
                {product: _id, quantity: quantity, price: priceProduct}
            ],
            totalPrice:  priceProduct,
            status: 'Chờ xác nhận'
        })
        if(!newOrder) return 'Mua hàng thất bại'
        return {
            message: 'Mua hàng thành công',
            status: 200,
            newOrder: newOrder
        }
    }
    static getAllOrderByUser = async ({ userID }) => {
        const order = await orderSchema.find({ user: userID }).sort({"orderDate": -1})
        if (!order) return { message: 'Không có đơn hàng nào' }
        return {
            order
        }
    }
    static getOrderDetail = async ({ orderID }) => {
        const order = await orderSchema.findOne({ _id: orderID }).populate({
            path: 'products.product',
            model: 'product',
        }).populate('user')
        if (!order) return { message: 'Không tìm thấy đơn hàng' }
        return {
            order
        }
    }
    static addToCart = async ({ userID,_id }) => {
        const product = await productSchema.findById({ _id: _id });
        if (!product) { 
            return {message: 'Không tìm thấy sản phẩm'}
        }
        let cart = await cartSchema.findOne({ user: userID })
        if (!cart) {
            cart = await cartSchema.create({ user: userID, items: [], total: 0 });
        }
        const existingItem = cart.items.find(item => item.product.toString() === _id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({
                product: _id
            });
        }
        cart.total += product.price;
        await cart.save();
        return {
            message: 'Sản phẩm đã được thêm vào giỏ hàng'
        }
    }
    static removeFromCart = async ({ userID, _id }) => {
        const product = await productSchema.findOne({ _id: _id })
        const cart = await cartSchema.findOne({ user: userID })
        const total = cart.total -  cart.items.find(item => item.product == _id).quantity * product.price
        await cartSchema.findOneAndUpdate({ user: userID }, {
            $pull: {
                items: {
                    product: _id
                },
            },
            $set: {
                total: total
            }
        })
        return {
            message: 'Xóa sản phẩm thành công',
        }
    } 
    static increaseQuantity = async ({ userID, _id }) => {
        const product = await productSchema.findOne({ _id: _id })
        const cart = await cartSchema.findOne({ user: userID })
        const total = cart.total + product.price
        const newQuan = (cart.items.find(item => item.product == _id).quantity + 1)
        await cartSchema.findOneAndUpdate({ user: userID , 'items.product': _id }, {
            $set: {
                total: total,
                'items.$.quantity': newQuan
            }
        })
        return {
            message: 'Tăng số lượng sản phẩm thành công',
        }
    } 
    static decreaseQuantity = async ({ userID, _id }) => {
        const product = await productSchema.findOne({ _id: _id })
        const cart = await cartSchema.findOne({ user: userID })
        const total = cart.total - product.price
        const newQuan = (cart.items.find(item => item.product == _id).quantity - 1)
        await cartSchema.findOneAndUpdate({ user: userID , 'items.product': _id }, {
            $set: {
                total: total,
                'items.$.quantity': newQuan
            }
        })
        return {
            message: 'Tăng số lượng sản phẩm thành công',
        }
    } 
    static payInCart = async ({ userId }) => {
        const cart = await cartSchema.findOne({ user: userId })
        await orderSchema.create({
            user: userId,
            products: cart.items,
            totalPrice: cart.total,
        })
        const productsToUpdate = cart.items.map(item => {
            return {
                updateOne: {
                    filter: { _id: item.product },
                    update: { $inc: { stockQuantity: -item.quantity, soldQuantity: item.quantity } }
                }
            };
        });

        await productSchema.bulkWrite(productsToUpdate);
        await cartSchema.findOneAndUpdate({ user: userId }, {
            $set: {
                items: [],
                total: 0
            }
        })
        return {
            message: 'Đặt hành thành công'
        }
    }
    static huyDonHang = async ({ _id }) => {
        const orderDetail = await orderSchema.findOneAndUpdate({ _id: _id }, {
            $set: {
            status: 'Đơn hàng đã bị hủy'
        }}).populate('user').populate({
            path: 'products.product',
            model: 'product',
        })
        return orderDetail
    }
    static nhanHang = async ({ _id }) => {
        const orderDetail = await orderSchema.findOneAndUpdate({ _id: _id }, {
            $set: {
            status: 'Đã giao hàng'
        }}).populate('user').populate({
            path: 'products.product',
            model: 'product',
        })
        return orderDetail
    }
    static getItemInCart = async ({ userId }) => {
        const cart = await cartSchema.findOne({ user: userId }).populate({
            path: 'items.product',
            model: 'product'
        })
        if (!cart) {
            const newcart = await cartSchema.create({
                user: userId,
                total: 0
            })
            return newcart
        }
        return cart
    }
    static getAllBlog = async () => {
        const blog = await blogSchema.find().lean()
        return {
            blog
        }
    }
}

module.exports =  service;