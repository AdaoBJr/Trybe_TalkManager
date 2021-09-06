const express = require('express');

const route = express.Router();

// MIDDLEWARES
const getListTalker = require('../middlewares/getListTalker');
const getTalkerId = require('../middlewares/getTalkerId');
const createTalker = require('../middlewares/createTalker');

route.get('/:id', getTalkerId);
route.get('/', getListTalker);
route.post('/', createTalker);

module.exports = route;