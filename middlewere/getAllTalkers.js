const fs = require('fs').promises;

const arquivo = './talker.json';

const getAllTalkers = (_req, res, _next) => {
fs.readFile(arquivo, 'utf8')
  .then((data) => res.status(200).send(data));
};

module.exports = getAllTalkers;
