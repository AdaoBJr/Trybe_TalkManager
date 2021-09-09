const fs = require('fs');

const file = './talker.json';
const HTTP_OK_STATUS = 200;

const getTalkers = async () => {
  const data = fs.readFile(file, 'utf-8');
  const talkers = await JSON.parse(data);

  return talkers;
};

const getAllTalkers = (_req, res) => {
  fs.readFile(file, 'utf-8')
    .then((response) => JSON.parse(response))
    .then((result) => res.status(HTTP_OK_STATUS).json(result))
    .catch((_err) => []);
};

module.exports = {
  getTalkers,
  getAllTalkers,
};
