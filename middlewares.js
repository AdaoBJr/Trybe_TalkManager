const fs = require('fs').promises;

const talker = './talker.json';

const readTalkerJson = async () => {
  const result = await fs.readFile(talker, 'utf-8');
  return JSON.parse(result);
};

module.exports = { readTalkerJson };
