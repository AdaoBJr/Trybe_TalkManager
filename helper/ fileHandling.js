const fs = require('fs').promises;

const fileTalker = 'talker.json';

async function readFile() {
  try {
    const readingFile = await fs.readFile(fileTalker, 'utf-8');
    const jsonData = await JSON.parse(readingFile);
    
    return jsonData;
  } catch (err) {
    return null;
  }
}

module.exports = {
  readFile,
};
