const fs = require('fs').promises;

async function dataPalestrantes() {
  const response = await fs.readFile('./talker.json', 'utf8');
  return JSON.parse(response);
}

module.exports = dataPalestrantes;
