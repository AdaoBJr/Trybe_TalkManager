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

const postTalker = async (newTalker) => {
  const talkerFile = './talker.json';
  const talkers = await talkersAll();
  const talk = {
      id: talkers.length + 1,
      ...newTalker,
  };
  talkers.push(talk);
  await fs.writeFile(talkerFile, JSON.stringify(talkers));
  return talk;
};

const deleteTalker = async (id) => {
  const talkerFile = './talker.json';
  const talkers = await talkersAll();
  const indexTalker = talkers.findIndex((ITEM) => ITEM.id === Number(id));
  talkers.splice(indexTalker, 1);
  await fs.writeFile(talkerFile, JSON.stringify(talkers));
};

module.exports = { talkersAll, talker, postTalker, deleteTalker };