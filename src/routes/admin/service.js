const userSchema = require('../../modules/user')
const productSchema = require('../../modules/product')
const categorySchema = require('../../modules/categories')
const orderSchema = require('../../modules/order')
const blogSchema = require('../../modules/blogpost')
const bcrypt = require('bcrypt');
const { createToken } = require('../../auth/createToken')
const fs = require('fs')
const path = require('path');
class service {
    static login = async ({ email, password }) => {
        const checkEmail = await userSchema.findOne({ email: email }).lean();
        if (!checkEmail) return {status: 401, message: 'Tài khoản không tồn tại' }
        const match = await bcrypt.compare(password, checkEmail.password);
        if (!match) {
            return {status: 401, message: 'Sai mật khẩu' }
        } else {
            if (checkEmail.role == 'user') {
                return { status: 403,message: 'Bạn không có quyền truy cập' }
            } 
            const token = await createToken(checkEmail._id, checkEmail.username,checkEmail.role)
            return {
                message: 'Đăng nhập thành công !!!',
                status: 200,
                token
            }
        }
        
    }
    static getAllProduct = async () => { 
        const product = await productSchema.find().lean();
        return product;
    }
    static addProduct = async (req) => { 
        const { name, description, price, category, stockQuantity } = req.body;
        if (!req.file.path) {
            console.error('Image object or path is missing.');
            return {status: 500,message: 'Image object or path is missing.'};
        } 
        const ext = path.extname(req.file.originalname);
        var img = fs.readFileSync(req.file.path);
        var encode_img = img.toString('base64');
        const imageType = req.file.mimetype;
        const image_product = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
        fs.rename(req.file.path, 'uploads/' +image_product, (err) => {
            if (err) { 
                console.log(err);
            }
        })
        const newImage = {
            data: encode_img,
            contentType: imageType,
        };
        const newProduct = await productSchema.create({
            name,
            description,
            price,
            category,
            image: newImage,
            stockQuantity
        }
        )
        if (newProduct) {
            return {status: 200,message: 'Thêm sản phẩm thành công'}
        } else {
            return {status: 500,message: 'Thêm sản phẩm thất bại'}
        }
    }
    static addCategory = async (name) => {
        const newCategory = await categorySchema.create(
            name
        )
        if (newCategory) {
            return  {status: 200,message: 'Thêm danh mục sản phẩm thành công'} 
        } else {
            return  {status: 500,message: 'Thêm danh mục sản phẩm thất bại'} 
        }
    }
    static getAllCategory = async () => { 
        const categories = await categorySchema.find().lean();
        return categories;
    }
    static getProductByID = async (req) => { 
        const product = await productSchema.findOne(req.body._id).lean();
        return product;
    }
    static removeCategory = async ({_id}) => { 
        const category = await categorySchema.findOneAndDelete({ _id: _id });
        return {
            message: 'Xóa danh mục thành công'
        }
    }
    static updateProduct = async (req) => { 
        const { _id, name, description, price, category, image, stockQuantity } = req.body;
        if (!req.file) {
            console.error('Image object or path is missing.');
            return {status: 500,message: 'Image object or path is missing.'};
        } 
        const ext = path.extname(req.file.originalname);
        var img = fs.readFileSync(req.file.path);
        var encode_img = img.toString('base64');
        const imageType = req.file.mimetype;
        const image_product = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
        fs.rename(req.file.path, 'uploads/' +image_product, (err) => {
            if (err) { 
                console.log(err);
            }
        })
        const newImage = {
            data: encode_img,
            contentType: imageType,
        };
        
        const updateroduct = await productSchema.findOneAndUpdate({_id: _id},{
            name,
            description,
            price,
            category,
            image: newImage,
            stockQuantity
        }
        )
        if (updateroduct) {
            return {status: 200,message: 'Update sản phẩm thành công'}  
        } else {
            return {status: 500,message: 'Update sản phẩm thất bại'}   
        }
    }
    static deleteProduct = async (req) => { 
        await productSchema.findOneAndDelete(req.body._id);
        const product = await productSchema.find().lean();
        return {
            message: 'delete product successfully',
            status: 200,
            product
        }
    }
    static getAllUser = async (req) => { 
        const user = await userSchema.find().lean();
        return user;
    }
    static getAllOrder = async (req) => { 
        const orders = await orderSchema.find().populate('user');
        return orders;
    }
    static getHome = async (req) => { 
        const countUser = await userSchema.count();
        const countProduct = await productSchema.count();
        const countOrder = await orderSchema.count();
        const product = await productSchema.find().sort({ soldQuantity: -1 }).lean();
        let total = 0;
        const order = await orderSchema.find()
        await order.map((item) => {
            total+= Number(item.totalPrice)
        })
        return {
            countUser,countProduct,countOrder,product,total
        }
    }
    static getOrderDetail = async ({_id}) => { 
        const orderDetail = await orderSchema.findOne({_id: _id}).populate('user').populate({
            path: 'products.product',
            model: 'product',
        })
        if (!orderDetail) return { message: 'Order not found' }
        return orderDetail
    }
    static giaoHang = async ({ _id }) => {
        const orderDetail = await orderSchema.findOneAndUpdate({ _id: _id }, {
            $set: {
            status: 'Đơn hàng đang được giao'
        }}).populate('user').populate({
            path: 'products.product',
            model: 'product',
        })
        return orderDetail
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
    static thongKe = async ({ year }) => {
        const order = await orderSchema.find().lean()
        const orderDate = order.filter((item) => year === Number(new Date(item.orderDate).getFullYear()))
        let total = 0
        await orderDate.map((item) => {
            total+=item.totalPrice
        })
        const orderCount = orderDate.length
        return {total , orderCount}
    }
    static createBlog = async ({ userId, title, content }) => {
        const blog = await blogSchema.create({
            title,content,author: userId.name,
        })
        if (!blog) return { message: 'Tạo blog thất bại' }
        return {
            message: 'Tạo blog thành công',
            blog
        }
    }
    static getAllBlog = async () => {
        const blog = await blogSchema.find().lean()
        return {
            blog
        }
    }
}

module.exports =  service;