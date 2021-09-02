const fs = require('fs').promises;

async function talkerId(id) {
  const talkers = fs.readFile(`${__dirname}/../talker.json`, 'utf8');
  return talkers.find((t) => t.id === id);
}

module.exports = talkerId;