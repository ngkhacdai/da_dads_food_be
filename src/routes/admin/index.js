const express = require('express');
const router = express.Router();
const {checkAdminRole} = require('../../auth/checkAuth')
const controller = require('./controller')

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

router.post('/login', controller.login)

router.get('/getallproduct',checkAdminRole,controller.getAllProduct)

router.post('/addproduct',upload.single('image'), checkAdminRole, controller.addproduct)

router.get('/getcategory',checkAdminRole,controller.getAllCategory)

router.post('/addcategory', checkAdminRole, controller.addCategory)

router.post('/removecategory', checkAdminRole, controller.removeCategory)

router.get('/getproductbyid', checkAdminRole, controller.getProductByID)

router.put('/updateproduct',upload.single('image'), checkAdminRole, controller.updateProduct)

router.post('/deleteproduct',checkAdminRole,controller.deleteProduct)

router.get('/getallorder',checkAdminRole,controller.getAllOrder)

router.get('/getalluser', checkAdminRole, controller.getAllUser)

router.get('/home', checkAdminRole, controller.getHome)

router.post('/getorderdetail', checkAdminRole, controller.getOrderDetail)

router.post('/giaohang', checkAdminRole, controller.giaoHang)

router.post('/huydonhang', checkAdminRole, controller.huyDonHang)

router.post('/thongke',checkAdminRole,controller.thongKe)

router.post('/createblog', checkAdminRole, controller.createBlog)

router.get('/getallblog',checkAdminRole,controller.getAllBlog)

module.exports = router;