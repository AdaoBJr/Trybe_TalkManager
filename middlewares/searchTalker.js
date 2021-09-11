const fs = require('fs');

const searchTalker = (req, res, _next) => {
  const query = req.query.q;
  const talkers = JSON.parse(fs.readFileSync('talker.json'));
  if (!query) return res.status(200).JSON(talkers);
  const filterTalker = talkers.filter((f) => f.name.includes(query));
  return res.status(200).JSON(filterTalker);
};
module.exports = searchTalker;
