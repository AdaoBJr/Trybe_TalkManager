const fs = require('fs');

function getAllTalkers() {
  return fs.readFile('./talker.json', 'utf-8')
    .then((fileContent) => JSON.parse(fileContent));
}

module.exports = { getAllTalkers };
