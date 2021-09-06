const talker = require('express').Router();
const { findAll } = require('../middlewares/index');

talker.get('/', findAll);

module.exports = {
  talker,
};
