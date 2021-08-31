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

const writeContentFile = async (content) => {
  try {
    await fs.writeFile(path, JSON.stringify(content));
    return content;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  readContentFile,
  writeContentFile,
};
