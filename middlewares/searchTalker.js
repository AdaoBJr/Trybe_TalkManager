const fs = require('fs');

const searchTalker = (req, res, _next) => {
  const { q } = req.query;
  const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  const filterTalker = talkers.filter((f) => f.name.includes(q));
  return res.status(200).JSON(filterTalker);
};

module.exports = searchTalker;
