const express = require('express');

// MIDDLEWARES
const getListTalker = require('../middlewares/getListTalker');
const getTalkerId = require('../middlewares/getTalkerId');
const createTalker = require('../middlewares/createTalker');
const editTalker = require('../middlewares/editTalker');

const route = express.Router();

route.get('/:id', getTalkerId);
route.get('/', getListTalker);
route.post('/', createTalker);
route.put('/:id', editTalker);

module.exports = route;