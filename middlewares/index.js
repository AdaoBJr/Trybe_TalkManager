const getTalker = require('./getTalker');
const getTalkerId = require('./getTalkerId');
const login = require('./login');
const {
  verificaNome,
  verificaToken,
  verificaIdade,
  verificaData,
  verificaTalk,
} = require('./verificações');
const addTalker = require('./addTalker');

module.exports = {
  getTalker,
  getTalkerId,
  login,
  verificaNome,
  verificaToken,
  verificaIdade,
  verificaData,
  verificaTalk,
  addTalker,
 };
