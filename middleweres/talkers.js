const fs = require('fs').promises;

const file = 'talker.json';
const OK_STATUS = 200;

const getTalkers = async () => {
  const data = await fs.readFile(file, 'utf-8');
  const talkers = await JSON.parse(data);

  return talkers;
};

const getAllTalkers = async (_req, res) => {
  const talkers = await getTalkers();

  if (!talkers) {
    return res.status(OK_STATUS).send([]);
  }

  return res.status(OK_STATUS).json(talkers);
};

module.exports = {
  getAllTalkers,
};
