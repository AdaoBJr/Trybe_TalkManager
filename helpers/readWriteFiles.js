const fs = require('fs').promises;

const path = ('./talker.json');

const readContentFile = async () => {
  try {
    const data = await fs.readFile(path, 'utf8');
    const result = JSON.parse(data);
    return result;
  } catch (err) {
    console.log(`Erro! ${err}`);
  }
};

module.exports = {
  readContentFile,
};