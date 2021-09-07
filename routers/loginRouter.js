const express = require('express');

const router = express.Router();

const { emailValid, passwordValid, postLogin } = require('../middlewares/index');

router.post('/', emailValid, passwordValid, postLogin);

module.exports = router;