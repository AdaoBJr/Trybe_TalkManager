const fs = require('fs').promises;

const talker = './talker.json';

const readFileTalker = async () => {
  const talkerList = await fs.readFile(talker, 'utf-8');
  return JSON.parse(talkerList);
};

const getTalkerById = async (id) => {
  const talkerList = await readFileTalker();
  return talkerList.find((obj) => obj.id === Number(id));
};

module.exports = {
  readFileTalker,
  getTalkerById,
};
