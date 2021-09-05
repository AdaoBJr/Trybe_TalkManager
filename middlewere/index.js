const getAllTalkers = require('./getAllTalkers');
const getTalkerById = require('./getTalkerById');
const { login, validateParams } = require('./login');
const validateToken = require('./validadeToken');
const { 
  validateName, 
  validateAge, 
  validateDate, 
  validateRate,
  validateTalk, 
  createTalker } = require('./createTalker');

module.exports = {
  getAllTalkers,
  getTalkerById,
  login,
  validateParams,
  validateToken,
  validateName,
  validateAge,
  validateDate,
  validateRate,
  validateTalk,
  createTalker,
};
