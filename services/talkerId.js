const fs = require('fs').promises;

async function talkerId(id) {
  const talkers = await fs.readFile(`${__dirname}/../talker.json`, 'utf8');
  const list = JSON.parse(talkers);
  return list.find((t) => t.id === +id);
}

module.exports = talkerId;