const userSchema = require('../../modules/user')
const bcrypt = require('bcrypt');
const {createToken}  = require('../../auth/createToken')
class service {
    static signup = async ({ username, email, password, address,phone }) => {
        const checkEmail = await userSchema.findOne({ email: email });
        if (checkEmail) return { message: 'Tài khoản đã tồn tại', status: 403 }
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
        if (!checkEmail) throw new Error('Email không tồn tại')
        const match = await bcrypt.compare(password, checkEmail.password);
        if (!match) throw new Error('Sai mật khẩu')
        const token = await createToken(checkEmail._id, checkEmail.username)
        return {
            message: 'Đăng nhập thành công !!!',
            status: 200,
            token
        }
    }
}

module.exports =  service;