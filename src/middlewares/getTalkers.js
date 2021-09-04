const fs = require('fs');

const getTalkers = (_req, res) => {
  const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));

  if (talkers.length > 0) { return res.status(200).json(talkers); }
  if (talkers.length === 0) { return res.status(200).json([]); }
};

module.exports = getTalkers;
