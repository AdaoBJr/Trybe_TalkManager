const readOnFile = require('../../auxiliar_functions/talkers_data/readOnFile');
const searchForTerm = require('../../auxiliar_functions/talkers_data/searchForTerm');
const { OK } = require('../../http_status/status');

const talkerData = 'talker.json';

const searchTalker = async (req, res) => {
  const { q } = req.query;
  const searchName = q.toLowerCase();

  const talkers = await readOnFile(talkerData);

  const talker = await searchForTerm(talkers, searchName);

  if (!q) return res.status(OK).json(talkers);

  if (!talker.length) return res.status(OK).json([]);

  return res.status(OK).json(talker);
};

module.exports = searchTalker;
