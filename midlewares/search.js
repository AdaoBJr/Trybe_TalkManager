const fs = require('fs').promises;

const search = async (req, res) => {
  const { q } = req.query;
  const talkersList = await fs.readFile('./talker.json', 'utf-8').then((json) => JSON.parse(json));
  const found = talkersList.filter((talker) => talker.name.includes(q));
  return res.status(200).json(found);
};

module.exports = search;