const getTalker = require('./getTalker');
const getTalkerId = require('./getTalkerId');
const login = require('./login');
const addTalker = require('./addTalker');
const {
  verificaToken,
  verificaNome,
  verificaIdade,
  verificaData,
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
  verificaTalk,
 };
