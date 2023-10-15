const userSchema = require('../../modules/user')
const productSchema = require('../../modules/product')
const categorySchema = require('../../modules/categories')
const bcrypt = require('bcrypt');
const { createToken } = require('../../auth/createToken')
const fs = require('fs')
const path = require('path');
class service {
    static login = async ({ email, password }) => {
        const checkEmail = await userSchema.findOne({ email: email }).lean();
        if (!checkEmail) return {status: 401, message: 'Tài khoản không tồn tại' }
        const match = await bcrypt.compare(password, checkEmail.password).lean();
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
        const ext = path.extname(req.file.originalname);
        if (!req.file.path) {
            console.error('Image object or path is missing.');
            return {status: 500,message: 'Image object or path is missing.'};
        } 
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
    static updateProduct = async (req) => { 
        const { _id, name, description, price, category, image, stockQuantity } = req.body;
        const ext = path.extname(req.file.originalname);
        const image_product = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
        fs.rename(req.file.path, 'uploads/' +image_product, (err) => {
            if (err) { 
                console.log(err);
            }
        })
        
        const updateroduct = await productSchema.findOneAndUpdate(_id,{
            name,
            description,
            price,
            category,
            image: image_product,
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
        const product = await productSchema.findOneAndDelete(req.body._id)
        return 'delete product successfully'
    }
}

module.exports =  service;