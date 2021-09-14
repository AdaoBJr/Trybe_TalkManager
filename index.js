const express = require('express');
const bodyParser = require('body-parser');

const authenticationMiddleware = require('./middlewares/auth-middleware');

const { searchById } = require('./services/content');

const { 
  validatorEmail, 
  validatorPassword, 
  SignupInfo, 
  registration, 
} = require('./services/login.js');

const { handleFileReading, handleFileWriting } = require('./services/readAndWrite');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';

const filePaths = {
  talker: './talker.json',
  tokens: './tokens.json',
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 1
app.get('/talker', async (_request, response) => {
  const contentFromFile = await handleFileReading(filePaths.talker);

  if (contentFromFile) {
    return response.status(HTTP_OK_STATUS).json(contentFromFile);
  }

  return response.status(HTTP_OK_STATUS).json([]);
});

// Requisito 2 
app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;

  const talkersDatabase = await handleFileReading(filePaths.talker);
  const findedTalker = searchById(talkersDatabase, id);
  const messageError = { message: 'Pessoa palestrante não encontrada' };

  if (findedTalker) {
    return response.status(HTTP_OK_STATUS).json(findedTalker);
  }

  return response.status(HTTP_NOT_FOUND_STATUS).json(messageError);
});

// Requisito 3
app.post('/login', async (request, response) => {
  const { email, password } = request.body; 

  const validateEmail = validatorEmail(email);
  const validatePassword = validatorPassword(password); 

  if (validateEmail !== true) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json({ message: validateEmail });
  }

  if (validatePassword !== true) {
    return response.status(HTTP_BAD_REQUEST_STATUS).json({ message: validatePassword });
  }

  const getToken = SignupInfo(email, password);
  return response.status(HTTP_OK_STATUS).json({ token: getToken.token });
});

// Requisito 4
app.use(authenticationMiddleware);

app.post('/talker', async (request, response) => {
  const { name, age, talk } = request.body;

  const currentFileContent = await handleFileReading(filePaths.talker);

  const validatedTalkerData = registration(name, age, talk);

  if (typeof validatedTalkerData === 'string') {
    return response.status(HTTP_BAD_REQUEST_STATUS).json({ message: validatedTalkerData });
  }

  currentFileContent.push(validatedTalkerData);
  await handleFileWriting(filePaths.talker, currentFileContent);
  return response.status(HTTP_CREATED_STATUS).json(validatedTalkerData);
});

app.listen(PORT, () => {
  console.log('Online');
});
