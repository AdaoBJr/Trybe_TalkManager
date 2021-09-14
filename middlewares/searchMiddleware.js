const { searchByName } = require('../services/content');
const { handleFileReading } = require('../services/readAndWrite');

const HTTP_OK_STATUS = 200;
const talkers = './talker.json';

async function searchMiddleware(request, response) {
  const { q } = request.query;
  const searchTerm = q;
  const contentFromFile = await handleFileReading(talkers);
  const searchForResults = searchByName(contentFromFile, searchTerm);

  if (!searchForResults.length) { return response.status(HTTP_OK_STATUS).json([]); }

  return response.status(HTTP_OK_STATUS).json(searchForResults);
}

module.exports = searchMiddleware;