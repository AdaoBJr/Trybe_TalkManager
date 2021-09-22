const fs = require('fs').promises;
const { readFileTalker } = require('../helpers');
const HTTP_201_STATUS = 201;

const createTalker = async (request, response, _next) => {
  const { name, age, talk } = request.body;
  const talker = await readFileTalker();
  const newTalker = {
    name,
    age,
    id: talker.length + 1,
    talk: { ...talk },
  };
  talker.push(newTalker);
  await fs.writeFile('./talker.json', JSON.stringify(talker));
  return response.status(HTTP_201_STATUS).json(newTalker);
};

module.exports = createTalker;
