const crypto = require('crypto');
const fs = require('fs').promises;

function gerarToken() {
  return crypto.randomBytes(8).toString('hex');
}

function readFile() {
  const talkers = fs.readFile('./talker.json', 'utf-8');
  return talkers.then((data) => JSON.parse(data))
  .catch((err) => JSON.parse(err));
}

function writeFile(props) {
  fs.writeFile('./talker.json', JSON.stringify(props));
}

module.exports = { gerarToken, 
  readFile, 
  writeFile, 
};