const error = require('./error');
const getAllTalkers = require('./getAllTalkers');
const getSingleTalker = require('./getSingleTalker');
const checkEmail = require('./checkEmail');
const checkPassword = require('./checkPassword');
const token = require('./token');

module.exports = {
  error,
  getAllTalkers,
  getSingleTalker,
  checkEmail,
  checkPassword,
  token,
};