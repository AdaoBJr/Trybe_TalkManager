const express = require('express');
const bodyParser = require('body-parser');

const {
  handleFileReading,
  // handleFileWriting,
} = require('./services/readAndWriteFilesHandler');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
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
    return response.status(200).json(contentFromFile);
  }

  response.status(200).json([]);
});

app.listen(PORT, () => {
  console.log('Online');
});
