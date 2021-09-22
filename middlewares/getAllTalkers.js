const { readFileTalker } = require('../helpers');
const HTTP_OK_STATUS = 200;

const getAllTalkers = async (_request, response) => {
  const allTalkers = await readFileTalker();
  return response.status(HTTP_OK_STATUS).json(allTalkers);
};

module.exports = getAllTalkers;
