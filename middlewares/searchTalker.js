const fs = require('fs');

const searchTalker = (req, res, _next) => {
  const query = req.query.q;
  const talkers = JSON.parse(fs.readFileSync('talker.json'));
  if (!query) {
    return res.status(200).json(talkers);
  }
  const talkerFiltered = talkers.filter((talk) => talk.name.includes(query));
  res.status(200).json(talkerFiltered);
};

module.exports = searchTalker;