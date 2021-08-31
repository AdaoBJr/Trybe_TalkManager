const fs = require('fs').promises;

async function getAllTalkers(_req, res) {
  const data = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
  if (data.length > 0) {
    return res.status(200).json(data);
  } return res.status(200).json([]);
}

module.exports = getAllTalkers;
