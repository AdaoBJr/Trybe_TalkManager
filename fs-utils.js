const fs = require('fs').promises;
const crypto = require('crypto');

function readFile() {
  const talkers = fs.readFile('./talker.json', 'utf-8');
  return talkers.then((data) => JSON.parse(data));
}
// Lê o arquivo 

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}
//Gera token aleatório. :)

module.exports = { readFile, generateToken };
