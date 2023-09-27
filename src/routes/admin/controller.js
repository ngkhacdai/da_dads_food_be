const service = require('./service')

class controller {

    login = async (req, res, next) => {
        res.send(await service.login(req.body))
    }
    addproduct = async (req, res, next) => {
        
    }
}

module.exports = new controller;