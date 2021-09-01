const express = require('express');
const { validEmail, validPassword, createloginToken } = require('../middleware');

const router = express.Router();

// 3
router.post('/', validEmail, validPassword, createloginToken);

module.exports = router;