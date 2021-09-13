const express = require('express');
const bodyParser = require('body-parser');

const { handleFileReading } = require('./services/readAndWrite');
const { searchById } = require('./services/content');
const { validatorEmail, validatorPassword, SignupInfo } = require('./services/login');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';

const filePaths = {
  talker: './talker.json',
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 1
app.route('/talker').get(async (_request, response) => {
  const contentFromFile = await handleFileReading(filePaths.talker);

  if (contentFromFile) {
    return response.status(HTTP_OK_STATUS).json(contentFromFile);
  }

  return response.status(HTTP_OK_STATUS).json([]);
});

// Requisito 2 
app.route('/talker/:id').get(async (request, response) => {
  const { id } = request.params;

  const talkersDatabase = await handleFileReading(filePaths.talker);
  const findedTalker = searchById(talkersDatabase, id);

  if (findedTalker) {
    return response.status(HTTP_OK_STATUS).json(findedTalker);
  }

  return response
    .status(HTTP_NOT_FOUND_STATUS)
    .json({ message: 'Pessoa palestrante não encontrada' });
});

// Requisito 3
app.route('/login').post((request, response) => {
  const { email, password } = request.body;
  const validateEmail = validatorEmail(email);
  const validatePassword = validatorPassword(password);

  if (validateEmail !== true) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: validateEmail });
  }

  if (validatePassword !== true) {
    return response
      .status(500)
      .json({ message: validatePassword });
  }

  const getToken = SignupInfo(email, password);
  return response.status(HTTP_OK_STATUS).json({ token: getToken.token });
});

app.listen(PORT, () => {
  console.log('Online');
});
