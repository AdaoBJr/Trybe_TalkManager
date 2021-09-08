const fs = require('fs');

const data = 'talker.json';

const getAlltakers = (_req, res) => {
  fs.readFile(data, 'utf-8')
    .then((response) => JSON.parse(response))
    .then((result) => res.status(200).json(result))
    .catch((_error) => []);
};

module.exports = getAlltakers;
