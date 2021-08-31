const fs = require('fs').promises;

const talker = async () => {
  const result = await fs.readFile('./talker.json', 'utf8');
  return JSON.parse(result);
};

module.exports = talker;