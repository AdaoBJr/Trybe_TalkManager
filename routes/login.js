const express = require('express');

// MIDDLEWARES
const { setLogin } = require('../middlewares/setLogin');

const route = express.Router();

route.post('/', setLogin);

module.exports = route;