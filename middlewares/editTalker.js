const fs = require('fs').promises;
const { readFileTalker } = require('../helpers');
const HTTP_OK_STATUS = 200;

const editTalker = async (request, response, _next) => {
  const { name, age, talk } = request.body;
  const { id } = request.params;
  const talker = await readFileTalker();
  const talkerEdit = {
    name,
    age,
    id: Number(id),
    talk: { ...talk },
  };
  const getTalker = talker.filter((filtertalker) => filtertalker.id !== id);
  getTalker.push(talkerEdit);
  await fs.writeFile('./talker.json', JSON.stringify(getTalker));
  return response.status(HTTP_OK_STATUS).json(talkerEdit);
};

module.exports = editTalker;
