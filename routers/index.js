const express = require('express');

const router = express.Router();

const { post } = require('../middlewares/index');

router.post('/', post);

module.exports = router;