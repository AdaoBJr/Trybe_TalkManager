const fs = require('fs').promises;
const { readFileTalker } = require('../helpers');
const HTTP_OK_STATUS = 200;
const DELETE_OK = { message: 'Pessoa palestrante deletada com sucesso' };

const deleteTalker = async (request, response) => {
  const id = Number(request.params.id);
  const talkers = await readFileTalker();
  const talker = talkers.filter((filtertalker) => filtertalker.id !== Number(id));
  await fs.writeFile('talker.json', JSON.stringify(talker));
  response.status(HTTP_OK_STATUS).json(DELETE_OK);
};

module.exports = deleteTalker;
