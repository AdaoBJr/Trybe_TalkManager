const express = require('express');
const bodyParser = require('body-parser');

const { handleFileReading } = require('./services/readAndWrite');
const { searchById } = require('./services/content');

const app = express();
app.use(bodyParser.json());

const HTTP_OK = 200;
const HTTP_NOT_FIND = 400;
const PORT = '3000';

const filePaths = {
  talker: './talker.json',
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK).send();
});

// Requisito 1
app.route('/talker').get(async (_request, response) => {
  const contentFromFile = await handleFileReading(filePaths.talker);

  if (contentFromFile) {
    return response.status(200).json(contentFromFile);
  }

  response.status(200).json([]);
});

// Requisito 2 
app.route('/talker/:id').get(async (request, response) => {
  const { id } = request.params;

  const talkersDatabase = await handleFileReading(filePaths.talker);
  const findedTalker = searchById(talkersDatabase, id);

  if (findedTalker) {
    return response.status(HTTP_OK).json(findedTalker);
  }

  return response
    .status(HTTP_NOT_FIND)
    .json({ message: 'Pessoa palestrante não encontrada' });
});

app.listen(PORT, () => {
  console.log('Online');
});
