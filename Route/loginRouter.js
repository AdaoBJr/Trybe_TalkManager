const express = require('express');

const router = express.Router();

const util = require('../utils');
const userAuth = require('../middlewares/userAuth');

router.post('/', userAuth, (req, res) =>
  res.status(200).json({
    token: util.generateToken(),
  }));

module.exports = router;
