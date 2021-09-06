const express = require('express');

const route = express.Router();

// MIDDLEWARES
const postLogin = require('./middlewares/login');

route.post('/', postLogin);

module.exports = route;