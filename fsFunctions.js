const fs = require('fs').promises;

async function readFile() {
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(talkers);
}

module.exports = { readFile };