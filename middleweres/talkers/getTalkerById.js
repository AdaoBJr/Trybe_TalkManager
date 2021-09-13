const readOnFile = require('../../auxiliar_functions/talkers_data/readOnFile');
const { OK, NOT_FOUND } = require('../../http_status/status');

const NOT_FOUND_MESSAGE = 'Pessoa palestrante não encontrada';
const talkerData = 'talker.json';

const getTalkerById = async (req, res) => {
  const talkers = await readOnFile(talkerData);
  const { id } = await req.params;

  const talker = await talkers.find((curr) => curr.id === +id);

  if (!talker) return res.status(NOT_FOUND).json({ message: NOT_FOUND_MESSAGE });

  return res.status(OK).json(talker);
};

module.exports = getTalkerById;
