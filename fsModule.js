const fs = require('fs').promises;

const getAllTalkers = async () => {
  const talkers = await fs.readFile('./talker.json');
  return JSON.parse(talkers);
};

module.exports = {
  getAllTalkers,
};