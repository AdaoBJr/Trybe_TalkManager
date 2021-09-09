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
  return res.status(HTTP_OK_STATUS).send(talkers);
};

module.exports = {
  getTalkers,
  getAllTalkers,
};
