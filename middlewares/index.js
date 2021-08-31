const talkerId = require('./talkerId');
const talker = require('./talker');
const login = require('./login');
const addTalker = require('./addTalker');
const getTalker = require('./getTalker');
const deleteTalker = require('./deleteTalker');
const editTalker = require('./editTalker');
const validateToken = require('./validateToken');
const validatesTalker = require('./validatesTalker');

module.exports = {
  talker,
  talkerId,
  login,
  addTalker,
  getTalker,
  deleteTalker,
  editTalker,
  validateToken,
  validatesTalker,
};
