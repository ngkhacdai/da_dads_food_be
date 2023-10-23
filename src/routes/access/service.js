const userSchema = require('../../modules/user')
const bcrypt = require('bcrypt');
const productSchema = require('../../modules/product')
const orderSchema = require('../../modules/order')
const cartSchema = require('../../modules/cart')
const {createToken}  = require('../../auth/createToken')
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
    static payOneProduct = async ( {userID, _id, quantity, price }) => { 
        const newOrder = await orderSchema.create({
            user: userID,
            products: [
                {product: _id, quantity: quantity, price: Number(price)}
            ],
            totalPrice: quantity * price,
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
        const order = await orderSchema.find({ user: userID })
        if (!order) return { message: 'Không có đơn hàng nào' }
        return {
            order
        }
    }
    static getOrderDetail = async ({ orderID }) => {
        const order = await orderSchema.find({ orderID: orderID }).populate({
            path: 'products.product',
            model: 'product',
        })
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
        await cartSchema.updateOne({ user: userID }, {
            $pull: {
                items: {
                    product: _id
            }
            }
        })
        return {
            message: 'Xóa sản phẩm thành công',
            cart
        }
    } 
    
}

module.exports =  service;