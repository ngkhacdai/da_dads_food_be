const userSchema = require('../../modules/user')
const bcrypt = require('bcrypt');
const {createToken}  = require('../../auth/createToken')
class service {
    static login = async ({ email, password }) => {
        const checkEmail = await userSchema.findOne({ email: email });
        if (!checkEmail) return { message: 'Tài khoản không tồn tại' }
        const match = await bcrypt.compare(password, checkEmail.password);
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
}

module.exports =  service;