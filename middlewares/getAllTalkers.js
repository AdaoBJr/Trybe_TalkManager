const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;

const getAllTalkers = async (_request, response) => {
  const allTalkers = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
  return response.status(HTTP_OK_STATUS).json(allTalkers);
};

module.exports = getAllTalkers;
