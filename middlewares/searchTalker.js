const fs = require('fs').promises;

const file = './talker.json';

const searchTalker = async (searchParam) => {
  const data = await fs.readFile(file, 'utf-8').then((result) => JSON.parse(result));
  console.log(searchParam);
  const queryTalker = data.filter(({ name }) =>
  name.toLowerCase().includes(searchParam.toLowerCase()));
  return queryTalker;
};

module.exports = searchTalker;
