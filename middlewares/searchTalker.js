const fs = require('fs').promises;

const searchTalker = async (req, res) => {
  const data = await fs
    .readFile('talker.json', 'utf8')
    .then((file) => JSON.parse(file));
  const searchedTalker = data.filter((talker) =>
    talker.name.includes(req.query.q));
  return res.status(200).json(searchedTalker);
};

module.exports = searchTalker;
