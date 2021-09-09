const express = require('express');

const router = express.Router();

const {
  verifyEmail,
  verifyPassword,
  returnToken,
} = require('../middleweres/login');

// router.get('/', returnToken);

router.get(
  '/',
  verifyEmail,
  verifyPassword,
  returnToken,
);

module.exports = router;
