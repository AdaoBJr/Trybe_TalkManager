const express = require('express');

const router = express.Router();

const {
  verifyEmail,
  verifyPassword,
  returnToken,
} = require('../middleweres/login');

router.post(
  '/',
  verifyEmail,
  verifyPassword,
  returnToken,
);

module.exports = router;
