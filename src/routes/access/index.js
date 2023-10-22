const express = require('express');
const router = express.Router();
const controller = require('./controller')
const {verifyToken} = require('../../auth/checkAuth')
router.post('/signup', controller.signup)

router.post('/login', controller.login)

router.get('/getallproduct', controller.getAllProduct)

router.get('/getproductbyid', controller.getProductByID)

router.post('/payoneproduct', verifyToken, controller.payOneProduct)

router.get('/getallorderbyuser',verifyToken,controller.getAllOrderByUser)

router.post('/getorderdetail', verifyToken, controller.getOrderDetail)

router.post('/addtocart', verifyToken, controller.addToCart)

router.post('/removefromcart', verifyToken, controller.removeFromCart)

module.exports = router;