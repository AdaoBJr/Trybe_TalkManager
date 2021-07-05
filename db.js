const fs = require('fs').promises;

const readData = async () => {
  const data = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(data);
};

const writeData = async (newData) => {
  const result = await fs.writeFile('./talker.json', JSON.stringify(newData));
  return result;
};

module.exports = {
  readData,
  writeData,
};
