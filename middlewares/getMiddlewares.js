const fs = require('fs').promises;

const talkers = './talker.json';

const readFile = async () => {
  const talkersList = await fs.readFile(talkers, 'utf-8');
  return JSON.parse(talkersList);
};

const getAllTalkers = () => readFile();

const getTalkerById = async (id) => {
  const talkerList = await readFile();
  return talkerList.find((obj) => obj.id === +id);
};

module.exports = {
  getAllTalkers,
  getTalkerById,
  readFile,
};
