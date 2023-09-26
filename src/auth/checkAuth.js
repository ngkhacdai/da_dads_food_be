const jwt = require('jsonwebtoken')

const verifyToken  = () => {
    const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
}
const asyneHandler = fn =>{
    return(req,res,next) =>{
        fn(req,res,next).catch(next)
    }
}
module.exports = {verifyToken ,asyneHandler}