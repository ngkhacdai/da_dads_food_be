const express = require('express');
const router = express.Router();
router.use('/v1/api/access', require('./access/index'))
router.use('/v1/api/admin',require('./admin/index'))
module.exports = router;