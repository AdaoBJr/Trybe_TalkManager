const express = require('express');

// MIDDLEWARES
const getListTalker = require('../middlewares/getListTalker');

const route = express.Router();

route.get('/', getListTalker);

module.exports = route;