const fs = require('fs').promises;

const getAllTalkers = async (_req, res) => {
  const data = await fs
    .readFile('talker.json', 'utf8')
    .then((file) => JSON.parse(file));
  return res.status(200).json(data);
};

module.exports = getAllTalkers;
