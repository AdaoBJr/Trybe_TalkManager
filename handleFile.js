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

// setTalkers

module.exports = { getTalkers, filterTalker };
