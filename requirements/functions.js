const fs = require('fs/promises');

function getAllTalkers() {
  return fs.readFile('./talker.json', 'utf-8')
    .then((fileContent) => JSON.parse(fileContent));
}

module.exports = { getAllTalkers };
