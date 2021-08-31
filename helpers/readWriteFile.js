const fs = require('fs').promises;

const talkerFile = 'talker.json';

const readContentFile = async () => {
  const content = await fs.readFile(talkerFile, 'utf-8');
  return JSON.parse(content);
};

module.exports = { readContentFile };
