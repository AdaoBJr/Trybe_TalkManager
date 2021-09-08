const fs = require('fs').promises;

const data = 'talker.json';

const getAlltalkers = (_req, res) => {
  fs.readFile(data, 'utf-8')
    .then((response) => JSON.parse(response))
    .then((result) => res.status(200).json(result))
    .catch((_err) => []);
};

module.exports = getAlltalkers;
