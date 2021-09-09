const express = require('express');

const router = express.Router();

const {
  returnToken,
  verifyEmail,
  verifyPassword,
} = require('../middleweres/login');

router.get(
  '/',
  verifyEmail,
  verifyPassword,
  returnToken,
);

module.exports = router;
