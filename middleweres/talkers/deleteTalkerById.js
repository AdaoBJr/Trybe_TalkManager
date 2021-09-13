const readOnFile = require('../../auxiliar_functions/talkers_data/readOnFile');
const searchOnFile = require('../../auxiliar_functions/talkers_data/searchOnFile');
const writeOnFile = require('../../auxiliar_functions/talkers_data/writeOnFile');
const { OK } = require('../../http_status/status');

const talkerData = 'talker.json';
const DELETED_MESSAGE = 'Pessoa palestrante deletada com sucesso';

const deleteTalkerById = async (req, res) => {
  const { id } = req.params;

  const talkers = await readOnFile(talkerData);
  const talker = await searchOnFile(talkers, id);

  const talkersJson = JSON.stringify(talker);

  await writeOnFile(talkerData, talkersJson);

  return res.status(OK).json({ message: DELETED_MESSAGE });
};

module.exports = deleteTalkerById;
