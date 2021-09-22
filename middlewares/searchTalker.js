const { readFileTalker } = require('../helpers');
const HTTP_OK_STATUS = 200;

const searchTalker = async (request, response) => {
  const { q } = request.query;
  const talkers = readFileTalker();
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
