const fs = require('fs').promises;

async function getListTalker() {
  const list = await fs.readFile(`${__dirname}/../talker.json`, 'utf8');
  return JSON.parse(list);
}

module.exports = getListTalker;