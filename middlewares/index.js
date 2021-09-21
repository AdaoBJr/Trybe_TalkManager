// const getTalker = require('./talker');

const getTalkerList = require('./talkers');
const getTalker = require('./talker');
const loginValidation = require('./loginValidation');
const tokenGen = require('./token');
const register = require('./register');
const deleteTalker = require('./deleteTalker');
const searchTalker = require('./searchTalker');

module.exports = {
  getTalkerList,
  getTalker,
  loginValidation,
  tokenGen,
  register,
  deleteTalker,
  searchTalker,
};
