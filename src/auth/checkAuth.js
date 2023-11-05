const jwt = require('jsonwebtoken')
const secretKey = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5NTcwMzM5NSwiaWF0IjoxNjk1NzAzMzk1fQ.1dC3Cj3zSBmCbk6m4zJ0zUuO1ZySRXBAy9mggYpfAfs"

const verifyToken  = (req,res,next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    console.log(req.user);
    next();
  });
}

const checkAdminRole = (req, res, next) => { 
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    console.log(decoded);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'You do not have permission to access this resource' });
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
module.exports = {verifyToken ,asyneHandler,checkAdminRole}