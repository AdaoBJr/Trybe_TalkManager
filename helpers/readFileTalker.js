const fs = require('fs').promises;

const readFileTalker = async () => {
  const allTalkers = await fs.readFile('./talker.json', 'utf8');
  const alltalkersJSON = JSON.parse(allTalkers);
  return alltalkersJSON;
};

module.exports = readFileTalker;
