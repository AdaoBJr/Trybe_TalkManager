const fs = require('fs').promises;
const HTTP_OK_STATUS = 200;
const HTTP_401_STATUS = 401;
const NOT_FOUND_TOKEN = { message: 'Token não encontrado' };
const INVALID_TOKEN = { message: 'Token inválido' };

const searchTalker = async (request, response) => {
  const { authorization } = request.headers;
  if (!authorization) {
    return response.status(HTTP_401_STATUS).json(NOT_FOUND_TOKEN);
  }
  if (authorization.length !== 16) {
    return response.status(HTTP_401_STATUS).json(INVALID_TOKEN);
  }
  const { q } = request.query;
  const talkers = JSON.parse(await fs.readFile('talker.json', 'utf-8'));
  if (!q) {
    return response.status(HTTP_OK_STATUS).json(talkers);
  }
  const talker = talkers.filter(({ name }) => name.toLowerCase().includes(q.toLowerCase()));
  if (talker) {
    return response.status(HTTP_OK_STATUS).json(talker);
  }
  return response.status(HTTP_OK_STATUS).json([]);
};

module.exports = searchTalker;
