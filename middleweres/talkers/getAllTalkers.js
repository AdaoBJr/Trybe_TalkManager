const readFile = require('../../auxiliar_functions/talkers_data/readFile');
const { OK } = require('../../http_status/status');

const talkerData = 'talker.json';

const getAllTalkers = async (_req, res) => {
  const talkers = await readFile(talkerData);

  if (!talkers) return res.status(OK).send([]);

  return res.status(OK).json(talkers);
};

module.exports = getAllTalkers;
