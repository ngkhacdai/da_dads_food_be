const express = require('express');
const router = express.Router();
router.use('/v1/api/access',require('./access/index'))
module.exports = router;