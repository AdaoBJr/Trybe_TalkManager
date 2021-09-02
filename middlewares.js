const fs = require('fs').promises;

const getTalkers = async () => {
  const readTalkers = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(readTalkers);
};

const getTalkerById = async (id) => {
  const talkers = await getTalkers();
  const talker = talkers.find((r) => r.id === parseInt(id, 10));

  return talker;
};

// const writeTalker = (content) => fs.writeFileSync('./talker.json', JSON.stringify(content));

module.exports = {
  getTalkers,
  getTalkerById,
};
