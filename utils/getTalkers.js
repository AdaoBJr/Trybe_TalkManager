const fs = require('fs').promises;

const getTalkers = async () => {
  const talkers = await fs.readFile('./talker.json', 'utf-8');

  if (!talkers) {
    return JSON.parse([]);
  }
  
  return JSON.parse(talkers);
};

const setTalkers = async (content) => {
  await fs.writeFile('./talker.json', JSON.stringify(content));
};

module.exports = {
  getTalkers,
  setTalkers,
};