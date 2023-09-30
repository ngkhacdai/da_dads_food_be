const express = require('express');
const router = express.Router();
const {checkAdminRole} = require('../../auth/checkAuth')
const controller = require('./controller')

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

router.post('/login', controller.login)

router.get('/getallproduct',checkAdminRole,controller.getAllProduct)

router.post('/addproduct',upload.single('image'), checkAdminRole, controller.addproduct)

router.get('/getcategory',checkAdminRole,controller.getCategory)

router.post('/addcategory',checkAdminRole,controller.addCategory)

module.exports = router;