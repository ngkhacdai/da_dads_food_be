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

router.get('/getproductbyid', checkAdminRole, controller.getProductByID)

router.put('/updateproduct',upload.single('image'), checkAdminRole, controller.updateProduct)

router.delete('/deleteproduct',checkAdminRole,controller.deleteProduct)

module.exports = router;