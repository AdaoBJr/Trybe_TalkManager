const talker = require('express').Router();
const { findAll, findOne } = require('../middlewares/index');

talker.get('/', findAll);

talker.get('/:id', findOne);

module.exports = talker;
