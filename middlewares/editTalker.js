const { StatusCodes: { OK } } = require('http-status-codes');
const { writeFiles, readFiles } = require('../helpers/filesHandle');

module.exports = async (req, res) => {
  const { body: { name, age, talk }, params: { id } } = req;
  const talkers = await readFiles();
  const editedTalker = { id: +id, name, age, talk };
  const filteredTalker = talkers.filter((talker) => talker.id === id);
  filteredTalker.push(editedTalker);
  await writeFiles(filteredTalker);
  return res.status(OK).json(editedTalker);
};
