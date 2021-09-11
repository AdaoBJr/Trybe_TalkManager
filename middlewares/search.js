const fs = require('fs');

const searchTalker = (req, res, _next) => {
  const talkers = JSON.parse(fs.readFileSync('talker.json'));
  const { q } = req.query;
  if (!q) return res.status(200).JSON(talkers);
  const filterTalker = talkers.filterTalker((f) => f.name.includes(q));
  return res.status(200).JSON(filterTalker);
};
module.exports = searchTalker;
