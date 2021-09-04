const { verificarInfo } = require('./verificarInfo');
const { generateToken } = require('./token');
const { validateToken } = require('./validateToken');
const validateName = require('./validateName');
const validateAge = require('./validateAge');
const addNewTalker = require('./addNewTalker');
const checkDate = require('./checkDate');
const checkRate = require('./checkRate');
const checkTalk = require('./checkTalk');
const { editTalker } = require('./editTalker');
const deleteId = require('./deleteId');
const { filtroName } = require('./filtroName');

module.exports = {
  verificarInfo,
  generateToken,
  addNewTalker,
  validateToken,
  validateName,
  validateAge,
  checkDate,
  checkRate,
  checkTalk,
  editTalker,
  deleteId,
  filtroName,
};
