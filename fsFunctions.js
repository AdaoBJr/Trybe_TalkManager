const fs = require('fs').promises;
const crypto = require('crypto');

async function readFile() {
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(talkers);
}

// Reference: https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js

function generateToken() {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
}

function writeFile(newTalker) {
  const action = fs.writeFile('./talker.json', JSON.stringify(newTalker));
  return action;
}

module.exports = { readFile, generateToken, writeFile };