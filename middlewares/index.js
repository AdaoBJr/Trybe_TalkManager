const getAllTalkers = require('./getAllTalkers');
const getTalker = require('./getTalker');
const error = require('./error');
const checkEmail = require('./checkEmail');
const checkPassword = require('./checkPassword');
const createToken = require('./login');
const addNewTalker = require('./addNewTalker');
const checkAge = require('./checkAge');
const checkDate = require('./checkDate');
const checkName = require('./checkName');
const checkRate = require('./checkRate');
const checkTalk = require('./checkTalk');
const checkToken = require('./checkToken');
const editTalker = require('./editTalker');
const deleteTalker = require('./deleteTalker');
const searchTalker = require('./searchTalker');

module.exports = {
  error,
  getAllTalkers,
  getTalker,
  checkEmail,
  checkPassword,
  createToken,
  addNewTalker,
  checkAge,
  checkDate,
  checkName,
  checkRate,
  checkTalk,
  checkToken,
  editTalker,
  deleteTalker,
  searchTalker,
};