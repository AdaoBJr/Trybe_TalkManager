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
const deleteTalker = require('./deleteTalker');
const searchTalker = require('./searchTalker');

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
  deleteTalker,
  searchTalker,
 };
