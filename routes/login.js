const express = require('express');

// MIDDLEWARES
const postLogin = require('../middlewares/login');

const route = express.Router();

route.post('/', postLogin);

module.exports = route;