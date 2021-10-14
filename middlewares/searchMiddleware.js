// Importação da função searchByName
const { searchByName } = require('../services/content');
// Importação da função handleFileReading
const { handleFileReading } = require('../services/readAndWrite');

// Constante com código de resposta HTTP
const HTTP_OK_STATUS = 200;
// Constante com endereço do arquivo
const talkers = './talker.json';

async function searchMiddleware(request, response) {
  // Pega o queryParam da requisição
  const { q } = request.query;
  // Constante com o termo a ser buscado
  const searchTerm = q;
  // Realiza leitura do conteúdo do arquivo
  const contentFromFile = await handleFileReading(talkers);
  // Realiza a busca de palestrantes pelo termo informado
  const searchForResults = searchByName(contentFromFile, searchTerm);
  // Caso não tenha correspndência retorna um array vazio
  if (!searchForResults.length) { return response.status(HTTP_OK_STATUS).json([]); }

  // Retorna o código de resposta com os resultados 
  return response.status(HTTP_OK_STATUS).json(searchForResults);
}

// Exportação padrão
module.exports = searchMiddleware;