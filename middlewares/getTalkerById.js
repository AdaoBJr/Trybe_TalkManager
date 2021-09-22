const { StatusCodes: { OK, NOT_FOUND } } = require('http-status-codes');
const { readFiles } = require('../helpers/filesHandle');

module.exports = async (req, res) => {
  const talkers = await readFiles();
  const talker = talkers.find(({ id }) => id === +req.params.id);
  if (!talker) return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(OK).json(talker);
};
