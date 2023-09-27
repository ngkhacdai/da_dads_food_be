const express = require('express');
const router = express.Router();
const controller = require('./controller')
const {verifyToken} = require('../../auth/checkAuth')
router.post('/signup', controller.signup)

router.post('/login', controller.login)

router.get('/',verifyToken, controller.index);

module.exports = router;