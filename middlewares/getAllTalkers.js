const fs = require('fs').promises;

const talkersData = './talker.json';
const HTTP_OK_STATUS = 200;

const allTalkers = (_req, res) => {
  fs.readFile(talkersData, 'utf8')
    .then((data) => JSON.parse(data))
    .then((result) => res.status(HTTP_OK_STATUS).json(result))
    .catch((_error) => []);
};

module.exports = allTalkers;
