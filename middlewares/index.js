const getTalker = require('./getTalker');
const getTalkerId = require('./getTalkerId');
const login = require('./login');
const addTalker = require('./addTalker');
const editTalker = require('./editTalker');
const deleteTalker = require('./deleteTalker');
const {
  verificaToken,
  verificaNome,
  verificaIdade,
  verificaData,
  verificaRate,
  verificaTalk,
} = require('./verificações');

module.exports = {
  getTalker,
  getTalkerId,
  login,
  addTalker,
  verificaToken,
  verificaNome,
  verificaIdade,
  verificaData,
  verificaRate,
  verificaTalk,
  editTalker,
  deleteTalker,
 };
