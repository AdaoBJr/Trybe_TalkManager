const express = require('express');
const getToken = require('../utils/getTokens');

const router = express.Router();

const {
  emailAuth,
  passwordAuth,
} = require('../middlewares/middles');

router.post('/', emailAuth, passwordAuth, (_req, res) => {
  const token = getToken();
  res.status(200).json({ token }); 
});

module.exports = router;