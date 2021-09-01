const getAllTalkers = require('./getAllTalkers');
const getTalkerById = require('./getTalkerById');
const { login, validateParams } = require('./login');

module.exports = {
  getAllTalkers,
  getTalkerById,
  login,
  validateParams,
};
