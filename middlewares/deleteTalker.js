const { StatusCodes: { OK } } = require('http-status-codes');
const { writeFiles, readFiles } = require('../helpers/filesHandle');

module.exports = async (req, res) => {
  const { id: deletedTalkerId } = req.params;
  const talkersList = await readFiles();
  const filteredTalker = talkersList.filter(({ id }) => +id !== +deletedTalkerId);
  await writeFiles(filteredTalker);
  return res.status(OK).json({ message: 'Pessoa palestrante deletada com sucesso' });
};
