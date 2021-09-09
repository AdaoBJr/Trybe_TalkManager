const fs = require('fs');

const file = './talker.json';
const HTTP_OK_STATUS = 200;

const getTalkers = async () => {
  const data = fs.readFile(file, 'utf-8');
  const talkers = await JSON.parse(data);

  return talkers;
};

const getAllTalkers = async (_req, res) => {
  const talkers = await getTalkers();
  if (!talkers.length) {
    return res.status(HTTP_OK_STATUS).send([]);
  }
  return res.status(HTTP_OK_STATUS).json(talkers);
};

module.exports = {
  getTalkers,
  getAllTalkers,
};
