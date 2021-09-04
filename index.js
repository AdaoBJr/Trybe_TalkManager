const express = require('express');
const bodyParser = require('body-parser');

const { searchById } = require('./services/contentHandlers.js');
const {
  handleSignupInfo,
  emailValidator,
  passwordValidator,
} = require('./services/signupAndLoginHandlers');
const {
  handleFileReading,
  // handleFileWriting,
} = require('./services/readAndWriteFilesHandler');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_BAD_REQUEST_STATUS = 400;
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
    .status(HTTP_NOT_FOUND_STATUS)
    .json({ message: 'Pessoa palestrante não encontrada' });
});

// todo: Requisito 3.
app.route('/login').post((request, response) => {
  const { email, password } = request.body;
  const validateEmail = emailValidator(email);
  const validatePassword = passwordValidator(password);

  if (validateEmail !== true) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: validateEmail });
  }

  if (validatePassword !== true) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: validatePassword });
  }

  const getToken = handleSignupInfo(email, password);
  return response.status(HTTP_OK_STATUS).json({ token: getToken.token });
});

app.listen(PORT, () => {
  console.log('Online');
});
