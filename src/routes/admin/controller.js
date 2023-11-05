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
    getAllCategory = async (req, res, next) => { 
        res.send(await service.getAllCategory())
    }
    getProductByID = async (req, res, next) => { 
        res.send(await service.getProductByID(req))
    }
    updateProduct = async (req, res, next) => { 
        res.send(await service.updateProduct(req))
    }
    deleteProduct = async (req, res, next) => { 
        res.send(await service.deleteProduct(req))
    }
    getAllUser = async (req, res, next) => { 
        res.send(await service.getAllUser(req))
    }
    getAllOrder = async (req, res, next) => { 
        res.send(await service.getAllOrder(req))
    }
    removeCategory = async (req, res, next) => { 
        res.send(await service.removeCategory(
            {_id: req.body._id}
        ))
    }
    getHome = async (req, res, next) => { 
        res.send(await service.getHome())
    }
    getOrderDetail = async (req, res, next) => {
        res.send(await service.getOrderDetail({_id: req.body._id}))
    }
    giaoHang = async (req, res, next) => {
        res.send(await service.giaoHang({_id: req.body._id}))
    }
    huyDonHang = async (req, res, next) => {
        res.send(await service.huyDonHang({_id: req.body._id}))
    }
    thongKe = async (req, res, next) => {
        res.send(await service.thongKe({
            year: req.body.year,
        }));
    }
    createBlog = async (req, res, next) => {
        res.send(await service.createBlog({
            userId: req.user,
            ...req.body
        }));
    }
    getAllBlog = async (req, res, next) => {
        res.send(await service.getAllBlog());
    }
}

module.exports = new controller;