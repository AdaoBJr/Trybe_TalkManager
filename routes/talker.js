const express = require('express');

const route = express.Router();

// MIDDLEWARES
const getListTalker = require('../middlewares/getListTalker');
const getTalkerId = require('../middlewares/getTalkerId');

route.get('/:id', getTalkerId);
route.get('/', getListTalker);

module.exports = route;