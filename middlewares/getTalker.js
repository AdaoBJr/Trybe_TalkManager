const fs = require('fs').promises;

const statusOK = 200;

const getTalker = (req, res) => {
  const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  if (!talkers.length === 0) {
    return res.status(statusOK).json([]);
  }
  res.status(statusOK).json(talkers);
};

module.exports = getTalker;
