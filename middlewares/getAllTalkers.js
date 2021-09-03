const fs = require('fs');

const getAllTalkers = async (_req, res) => {
  const talkers = await JSON.parse(fs.readFileSync('talker.json'));

  if (!talkers) {
    res.status(200).json([]);
  }

  res.status(200).json(talkers);
};

module.exports = getAllTalkers;