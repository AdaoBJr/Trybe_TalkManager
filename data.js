const fs = require('fs').promises;

const talkerFile = './talker.json';

const talkersAll = async () => {
  const talkers = await fs.readFile(talkerFile);
  return JSON.parse(talkers);
};

const talkerGet = async (id) => {
  const talkers = JSON.parse(await fs.readFile(talkerFile));
  return talkers.find((response) => response.id === Number(id));
};

const postTalker = async (newTalker) => {
  const talkers = await talkersAll();
  const talk = {
      id: talkers.length + 1,
      ...newTalker,
  };
  talkers.push(talk);
  await fs.writeFile(talkerFile, JSON.stringify(talkers));
  return talk;
};

const putTalker = async (id, updatedTalker) => {
  const talkers = await talkersAll();
  const indexTalker = talkers.findIndex((r) => r.id === +(id));
  talkers.splice(indexTalker, 1);
  await fs.writeFile(talkerFile, JSON.stringify(talkers));
  const updatedTalkers = await postTalker(updatedTalker);
  return updatedTalkers;
};

const deleteTalker = async (id) => {
  const talkers = await talkersAll();
  const indexTalker = talkers.findIndex((ITEM) => ITEM.id === Number(id));
  talkers.splice(indexTalker, 1);
  await fs.writeFile(talkerFile, JSON.stringify(talkers));
};

module.exports = { talkersAll, talkerGet, postTalker, deleteTalker, putTalker };