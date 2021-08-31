const fs = require('fs').promises;

function readFile() {
  const talkers = fs.readFile('./talker.json', 'utf-8');
  return talkers.then((data) => JSON.parse(data));
}

module.exports = { readFile };
