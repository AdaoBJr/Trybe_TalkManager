const fs = require('fs').promises;

const fileTalker = 'talker.json';

async function readFile() {
  const readingFile = await fs.readFile(fileTalker, 'utf-8', (err) => {
    if (err) return null;
  });
  const jsonData = await JSON.parse(readingFile);

  return jsonData;
}

module.exports = {
  readFile,
};
