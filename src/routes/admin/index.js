const express = require('express');
const router = express.Router();
const {checkAdminRole} = require('../../auth/checkAuth')
const controller = require('./controller')

router.post('/login', controller.login)
router.post('/addProduct',checkAdminRole,controller.addproduct)

module.exports = router;