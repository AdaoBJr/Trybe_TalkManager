const fs = require('fs').promises;

async function readFile() {
  try {
    const file = await fs.readFile('./talker.json', 'utf8');
    const result = await JSON.parse(file);
    return result;
  } catch (err) {
     return console.log(err);
  }
}

module.exports = {
  readFile,
};