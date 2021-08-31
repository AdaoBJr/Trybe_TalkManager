const fs = require('fs').promises;

const talkerFile = 'talker.json';

const readContentFile = async () => {
  const content = await fs.readFile(talkerFile, 'utf-8');
  return JSON.parse(content);
};

const writeContentFile = async (content) => {
  await fs.writeFile(talkerFile, JSON.stringify(content));
};

module.exports = { readContentFile, writeContentFile };
