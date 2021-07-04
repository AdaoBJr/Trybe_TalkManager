const fs = require('fs').promises;

const readData = async () => {
  const data = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(data);
};

module.exports = {
  readData,
};
