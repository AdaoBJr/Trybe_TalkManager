const getAllTalkers = require('./getAllTalkers');
const getSingleTalker = require('./getSingleTalker');
const error = require('./error');
const checkEmail = require('./checkEmail');
const checkPassword = require('./checkPassword');
const createToken = require('./createToken');
const addNewTalker = require('./addNewTalker');
const checkAge = require('./checkAge');
const checkDate = require('./checkDate');
const checkName = require('./checkName');
const checkRate = require('./checkRate');
const checkTalk = require('./checkTalk');
const checkToken = require('./checkToken');

module.exports = {
  error,
  getAllTalkers,
  getSingleTalker,
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

};