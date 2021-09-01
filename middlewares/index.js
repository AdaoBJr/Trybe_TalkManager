const talker = require('./talker');
const talkerId = require('./talkerId');
const login = require('./login');
const validateToken = require('./validateToken');
const validateTalker = require('./validateTalker');
const addTalker = require('./addTalker');
const editTalker = require('./editTalker');
const deleteTalker = require('./deleteTalker');

module.exports = {
  talker,
  talkerId,
  login,
  validateToken,
  validateTalker,
  addTalker,
  editTalker,
  deleteTalker,
};
