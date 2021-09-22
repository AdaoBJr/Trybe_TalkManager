const fs = require('fs').promises;

const readFiles = async () => {
  const file = await fs.readFile('talker.json', 'utf-8');
  return JSON.parse(file);
};

const writeFiles = async (talker) => {
  const file = await fs.writeFile('talker.json', JSON.stringify(talker), 'utf-8');
  return file;
};

module.exports = { readFiles, writeFiles, };