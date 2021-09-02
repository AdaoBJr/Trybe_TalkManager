const fs = require('fs').promises;

const path = './talker.json';

const getTalkersData = async (_req, res) => {
  const data = await fs.readFile(path, 'utf8');
  return res.status(200).json(JSON.parse(data));
};

module.exports = getTalkersData;
