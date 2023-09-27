const jwt = require('jsonwebtoken')
const secretkey = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5NTcwMzM5NSwiaWF0IjoxNjk1NzAzMzk1fQ.1dC3Cj3zSBmCbk6m4zJ0zUuO1ZySRXBAy9mggYpfAfs"
const options = {
    expiresIn: '720h',
};
const createToken = (_id, username,role) => {
    return jwt.sign({_id: _id,name: username,role: role},secretkey,options)
}

module.exports = {createToken}