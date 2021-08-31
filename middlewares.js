const fs = require('fs').promises;

const talker = './talker.json';

const readFileTalker = async () => {
  const talkesList = await fs.readFile(talker, 'utf-8');
  return JSON.parse(talkesList);
};

module.exports = {
  readFileTalker,
};
