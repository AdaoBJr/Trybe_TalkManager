const fs = require('fs').promises;
const { readFileTalker } = require('../helpers');
const HTTP_OK_STATUS = 200;
const HTTP_401_STATUS = 401;
const NOT_FOUND_TOKEN = { message: 'Token não encontrado' };
const INVALID_TOKEN = { message: 'Token inválido' };
const DELETE_OK = { message: 'Pessoa palestrante deletada com sucesso' };

const deleteTalker = async (request, response) => {
  const { authorization } = request.headers;
  if (!authorization) {
    return response.status(HTTP_401_STATUS).json(NOT_FOUND_TOKEN);
  }
  if (authorization.length !== 16) {
    return response.status(HTTP_401_STATUS).json(INVALID_TOKEN);
  }
  const id = Number(request.params.id);
  const talkers = await readFileTalker();
  const talker = talkers.filter((filtertalker) => filtertalker.id !== Number(id));
  await fs.writeFile('talker.json', JSON.stringify(talker));
  response.status(HTTP_OK_STATUS).json(DELETE_OK);
};

module.exports = deleteTalker;
