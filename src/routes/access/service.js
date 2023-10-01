const userSchema = require('../../modules/user')
const bcrypt = require('bcrypt');
const productSchema = require('../../modules/product')
const {createToken}  = require('../../auth/createToken')
class service {
    static signup = async ({ username, email, password, address,phone }) => {
        const checkEmail = await userSchema.findOne({ email: email });
        if (checkEmail) return { message: 'Tài khoản đã tồn tại' }
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
        if (!checkEmail) return { message: 'Tài khoản không tồn tại' }
        const match = await bcrypt.compare(password, checkEmail.password);
        if (!match) return { message: 'Sai mật khẩu' }
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
}

module.exports =  service;