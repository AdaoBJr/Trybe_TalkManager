const fs = require('fs').promises;

const getTalkers = async () => {
  const talkers = await fs.readFile('./talker.json');
  return JSON.parse(talkers);
};

const filterTalker = async (talkerID) => {
  const talkers = await getTalkers();
  const talker = talkers.find(({ id }) => id === parseInt(talkerID, 10));
  return talker;
};

const setTalkers = async (content) => {
  const talkers = await getTalkers();
  const newTalker = { ...content, id: talkers.length + 1 };
  talkers.push(newTalker);
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
  return newTalker;
};

// setTalkers

module.exports = { getTalkers, filterTalker, setTalkers };
