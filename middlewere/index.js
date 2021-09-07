const getAllTalkers = require('./getAllTalkers');
const getTalkerById = require('./getTalkerById');
const { login, validateParams } = require('./login');
const { 
  validateName, 
  validateAge,
  validateTalk,
  validateDate,
  validateRate, 
  validateToken,
} = require('./validations');
const createTalker = require('./createTalker');
const editTalker = require('./editTalker');
const deleteTalker = require('./deleteTalker');

module.exports = {
  getAllTalkers,
  getTalkerById,
  login,
  validateParams,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
  createTalker,
  editTalker,
  deleteTalker,
};
