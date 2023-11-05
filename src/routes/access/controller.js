const service = require('./service')

class controller {
    signup = async (req, res, next) =>{
        res.send(await service.signup(req.body))
    }
    login = async (req, res, next) => {
        res.send(await service.login(req.body))
    }
    getAllProduct = async (req, res, next) => {
        res.send(await service.getAllProduct())
    }
    getProductByID = async (req, res, next) => { 
        res.send(await service.getProductByID(req))
    }
    payOneProduct = async (req, res, next) => { 
        res.send(
            await service.payOneProduct({
                userID: req.user._id,
                ...req.body
            })
        )
    }
    getAllOrderByUser = async (req, res, next) => {
        res.send(
            await service.getAllOrderByUser({
                userID: req.user._id,
            })
        )
    }
    getOrderDetail = async (req, res, next) => {
        res.send(
            await service.getOrderDetail({
                orderID: req.body._id,
            })
        )
    }
    addToCart = async (req, res, next) => {
        res.send(await service.addToCart({userID: req.user._id,
            ...req.body
        }))
    }
    removeFromCart = async (req, res, next) => { 
        res.send(await service.removeFromCart({
            userID: req.user._id,
            ...req.body
        }))
    }
    increaseQuantity = async (req, res, next) => { 
        res.send(await service.increaseQuantity({
            userID: req.user._id,
            ...req.body
        }))
    }
    decreaseQuantity = async (req, res, next) => { 
        res.send(await service.decreaseQuantity({
            userID: req.user._id,
            ...req.body
        }))
    }
    payInCart = async (req, res, next) => {
        res.send(await service.payInCart({
            userId: req.user._id,
        }))
    }
    huyDonHang = async (req, res, next) => {
        res.send(await service.huyDonHang({_id: req.body._id}))
    }
    nhanHang = async (req, res, next) => {
        res.send(await service.nhanHang({_id: req.body._id}))
    }
    getItemInCart = async (req, res, next) => {
        res.send(await service.getItemInCart({
            userId: req.user._id,
        }))
    }
    getAllBlog = async (req, res, next) => {
        res.send(await service.getAllBlog());
    }
}

module.exports = new controller;