const { StatusCodes: { OK } } = require('http-status-codes');
const { readFiles } = require('../helpers/filesHandle');
const deleteTalker = require('./deleteTalker');
const editTalker = require('./editTalker');
const getAllTalkers = require('./getAllTalkers');
const getTalkerById = require('./getTalkerById');

module.exports = async (req, res) => {
  const { query } = req.query;
  const talkers = await readFiles();

  if (!query) return res.status(OK).json(talkers);
  const filteredTalker = talkers.filter(({ name }) => name.includes(query));
  return filteredTalker ? res.status(OK).json(filteredTalker) : res.status(OK).json([]);
};
