const fs = require('fs').promises;

const FILE = 'talker.json';

const readFile = async () => {
  try {
    const content = await fs.readFile(FILE, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
};

const writeFile = async (data) => {
  try {
    const fileContent = await fs.readFile(FILE, 'utf8');
    fileContent.push(data);
    await fs.writeFile(FILE, JSON.stringify(fileContent));
    return data;
  } catch (error) {
    return null;
  }
};

module.exports = {
  readFile,
  writeFile,
};
