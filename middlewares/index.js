// const readMiddleware = require('./readMiddleware');
const getTalkers = require('./getTalkers');
const getTalkersById = require('./getTalkersById');
const login = require('./login');
const auth = require('./authorization');
const valid = require('./valid');
const createTalker = require('./createTalker');
const modTalker = require('./modTalker');
const removeTalker = require('./removeTalker');

module.exports = {
  getTalkers,
  getTalkersById,
  login,
  valid,
  auth,
  createTalker,
  modTalker,
  removeTalker,
};
