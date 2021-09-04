const express = require('express');
const bodyParser = require('body-parser');

const { searchById } = require('./services/contentHandlers.js');
const {
  handleFileReading,
  // handleFileWriting,
} = require('./services/readAndWriteFilesHandler');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FIND_STATUS = 404;
const PORT = '3000';

const filePaths = {
  talker: './talker.json',
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// todo: Requisito 1.
app.route('/talker').get(async (_request, response) => {
  const contentFromFile = await handleFileReading(filePaths.talker);

  if (contentFromFile) {
    return response.status(HTTP_OK_STATUS).json(contentFromFile);
  }

  return response.status(HTTP_OK_STATUS).json([]);
});

// todo: Requisito 2.
app.route('/talker/:id').get(async (request, response) => {
  const { id } = request.params;

  const talkersDatabase = await handleFileReading(filePaths.talker);
  const findedTalker = searchById(talkersDatabase, id);

  if (findedTalker) {
    return response.status(HTTP_OK_STATUS).json(findedTalker);
  }

  return response
    .status(HTTP_NOT_FIND_STATUS)
    .json({ message: 'Pessoa palestrante não encontrada' });
});

app.listen(PORT, () => {
  console.log('Online');
});
