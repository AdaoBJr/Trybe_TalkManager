const express = require('express');

const route = express.Router();

// MIDDLEWARES
const postLogin = require('../middlewares/postLogin');

route.post('/', postLogin);

module.exports = route;