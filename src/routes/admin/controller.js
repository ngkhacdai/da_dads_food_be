const service = require('./service')

class controller {

    login = async (req, res, next) => {
        res.send(await service.login(req.body))
    }
    addproduct = async (req, res, next) => {
        res.send(await service.addProduct(req))
    }
    getAllProduct = async (req, res, next) => {
        res.send(await service.getAllProduct())
    }
    addCategory = async (req, res, next) => {
        res.send(await service.addCategory(req.body))
    }
    getCategory = async (req, res, next) => { 
        res.send(await service.getCategory())
    }
}

module.exports = new controller;