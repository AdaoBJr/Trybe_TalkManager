const fs = require('fs').promises;

const talkersAll = async () => {
  const talkerFile = './talker.json';
  const talkers = await fs.readFile(talkerFile);
  return JSON.parse(talkers);
};

const talker = async (id) => {
  const talkerFile = './talker.json';
  const talkers = JSON.parse(await fs.readFile(talkerFile));
  return talkers.find((response) => response.id === Number(id));
};

module.exports = { talkersAll, talker };