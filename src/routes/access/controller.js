const service = require('./service')

class controller {
    signup = async (req, res, next) =>{
        res.send(await service.signup(req.body))
    }
    login = async (req, res, next) => {
        res.send(await service.login(req.body))
    }
    index = async (req, res, next) => { 
        res.send('ádjkghahdga')
    }
    getAllProduct = async (req, res, next) => {
        res.send(await service.getAllProduct())
    }
    getProductByID = async (req, res, next) => { 
        res.send(await service.getProductByID(req))
    }
}

module.exports = new controller;