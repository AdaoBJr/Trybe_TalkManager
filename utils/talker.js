const fs = require('fs').promises;

const getTalkers = async () => {
  const talkers = await fs.readFile('./talker.json', 'utf-8');

  if (!talkers) {
    return JSON.parse([]);
  }
  
  return JSON.parse(talkers);
};

module.exports = {
  getTalkers,
};