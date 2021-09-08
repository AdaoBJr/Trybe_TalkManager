const getAllTalkers = require('./getAllTalkers');
const getTalkerById = require('./getTalkerById');
const { createTalker } = require('./createTalker');
const { login, validatePass, validateMail, validateToken } = require('./login');

module.exports = {
  getAllTalkers,
  getTalkerById,
  login,
  createTalker,
  validatePass,
  validateMail,
  validateToken,
};
