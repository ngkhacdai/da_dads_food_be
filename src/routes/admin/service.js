const userSchema = require('../../modules/user')
const productSchema = require('../../modules/product')
const categorySchema = require('../../modules/categories')
const bcrypt = require('bcrypt');
const { createToken } = require('../../auth/createToken')
const fs = require('fs')
class service {
    static login = async ({ email, password }) => {
        const checkEmail = await userSchema.findOne({ email: email }).lean();
        if (!checkEmail) return { message: 'Tài khoản không tồn tại' }
        const match = await bcrypt.compare(password, checkEmail.password).lean();
        if (!match) {
            return { message: 'Sai mật khẩu' }
        } else {
            if (checkEmail.role == 'user') {
                return { message: 'Bạn không có quyền truy cập' }
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
        const product = await productSchema.find();
        return product;
    }
    static addProduct = async (req) => { 
        const { name, description, price, category, image, stockQuantity } = req.body;
        if (!req.file.path) {
            console.error('Image object or path is missing.');
            return 'Thêm sản phẩm thất bại';
        } 
        fs.rename(req.file.path, 'uploads/' + req.file.originalname, (err) => {
            if (err) { 
                console.log(err);
            }
        })
        const image_product = req.file.originalname;
        const newProduct = await productSchema.create({
            name,
            description,
            price,
            category,
            image: image_product,
            stockQuantity
        }
        )
        if (newProduct) {
            return 'Thêm sản phẩm thành công'
        } else {
            return 'Thêm sản phẩm thất bại'
        }
    }
    static addCategory = async (name) => {
        const newCategory = await categorySchema.create(
            name
        )
        if (newCategory) {
            return 'Thêm danh mục sản phẩm thành công'
        } else {
            return 'Thêm danh mục sản phẩm thất bại'
        }
    }
    static addCategory = async () => { 
        const categories = await categorySchema.find().lean();
        return categories;
    }
}

module.exports =  service;