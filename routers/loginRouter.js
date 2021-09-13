const express = require('express');

const router = express.Router();

const emailValidate = require('../middleweres/login/emailValidate');
const passwordValidate = require('../middleweres/login/passwordValidate');
const loginValidate = require('../middleweres/login/loginValidate');

router.route('/')
  .post(
    emailValidate,
    passwordValidate,
    loginValidate,
    );

module.exports = router;
