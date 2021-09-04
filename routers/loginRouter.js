const express = require('express');
const { sendLogin } = require('../helper/auxiliaryFunctions');
const { validateEmail, validatePassword } = require('../middleware/validationMiddleware');

const router = express.Router();

router.post('/', validateEmail, validatePassword, sendLogin);

module.exports = router;
