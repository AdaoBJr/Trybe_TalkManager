const readAllTalkers = require('./readAllTalkers');
const readTalkerById = require('./readTalkerById');
const validateUser = require('./validateUser');
const validateToken = require('./validadeToken');
const editTalker = require('./editTalker');
const { 
  validateName,
  validateAge, 
  validateWatchedAt, 
  validateRate, 
  validateTalkInfo,
  readAndPushNewTalker, 
} = require('./addNewTalker');

module.exports = {
  readAllTalkers,
  readTalkerById,
  validateUser,
  validateToken,
  validateName,
  validateAge,
  validateWatchedAt,
  validateRate,
  validateTalkInfo,
  readAndPushNewTalker,
  editTalker,
};