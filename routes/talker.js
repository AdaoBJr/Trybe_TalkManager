const express = require('express');

// MIDDLEWARES
const getListTalker = require('../middlewares/getListTalker');
const getTalkerId = require('../middlewares/getTalkerId');

const route = express.Router();

route.get('/:id', getTalkerId);
route.get('/', getListTalker);

module.exports = route;