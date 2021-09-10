const express = require('express');

const router = express.Router();

const { emailValid, passwordValid, postLogin } = require('../middlewares/login');

router.post('/', emailValid, passwordValid, postLogin);

module.exports = router;