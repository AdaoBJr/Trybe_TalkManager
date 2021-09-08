const getTalker = require('./getTalker');
const getTalkerId = require('./getTalkerId');
const login = require('./login');
const addTalker = require('./addTalker');
const {
  verificaToken,
  verificaNome,
  verificaIdade,
  verificaData,
  verificaRate,
  verificaTalk,
} = require('./verificações');
const editTalker = require('./editTalker');
const deleteTalker = require('./deleteTalker');
const error = require('./erro');

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
  error,
 };
