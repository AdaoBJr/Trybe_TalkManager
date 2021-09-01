const fs = require('fs').promises;

const getTalkers = async () => {
  const talkers = await fs.readFile('./talker.json');
  return JSON.parse(talkers);
};

// setTalkers

module.exports = { getTalkers };
