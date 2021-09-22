const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;
const HTTP_404_STATUS = 404;
const NOT_REGISTERED = { message: 'Pessoa palestrante não encontrada' };

const getTalkerById = async (request, response) => {
  const { id } = request.params;
  const allTalkers = JSON.parse(await fs.readFile('talker.json', 'utf-8'));
  const talkerById = allTalkers.find((talker) => talker.id === parseInt(id, 10));
  if (!talkerById) {
    return response.status(HTTP_404_STATUS).json(NOT_REGISTERED);
  }
  return response.status(HTTP_OK_STATUS).json(talkerById);
};

module.exports = getTalkerById;
