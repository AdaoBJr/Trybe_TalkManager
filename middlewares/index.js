const getAllTalkers = require('./middlewares/getAllTalkers');
const getTalkerById = require('./middlewares/getTalkerById');
const login = require('./middlewares/login');
const createTalker = require('./middlewares/createTalker');
const editTalker = require('./middlewares/editTalker');
const deleteTalker = require('./middlewares/deleteTalker');
const searchTalker = require('./middlewares/searchTalker');

module.exports = {
  getAllTalkers,
  getTalkerById,
  login,
  createTalker,
  editTalker,
  deleteTalker,
  searchTalker,
};
