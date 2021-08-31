const fs = require('fs').promises;

const readFile = async (filePath) => {
  const fileReading = await fs.readFile(filePath, 'utf-8');
  const objFile = await JSON.parse(fileReading);
  return objFile;
};

module.exports = readFile;