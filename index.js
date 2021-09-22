const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const { talkersAll, talker, postTalker, deleteTalker } = require('./data.js');
const {
  emailValid,
  passwordValid, 
  tokenValid, 
  nameValid, ageValid, talkValid, watchedAtValid, rateValid } = require('./middleware.js');
  
// const talkerRouter = express.Router();
const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const NOT_FOUND = 404;
const CREATED = 201;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const talkers = await talkersAll();
    response.status(HTTP_OK_STATUS).json(talkers);
});

app.post(
  '/talker',
  tokenValid,
  nameValid,
  ageValid,
  talkValid,
  watchedAtValid,
  rateValid,
  async (request, response) => {
    const value = await postTalker(request.body);
    response.status(CREATED).json(value);
},
);

app.get('/talker/:id', async (request, response) => {
  const id = await talker(request.params.id);
  if (!id) { 
    return response.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' }); 
  }
  response.status(HTTP_OK_STATUS).json(id);
});

app.post('/login', emailValid, passwordValid, async (request, response) => {
  const token = randomBytes(8).toString('hex');
  response.status(HTTP_OK_STATUS).json({ token });
});

app.delete(
  '/:id',
  tokenValid,
  async (request, response) => {
    const { id } = request.params;
    await deleteTalker(id);
    response.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  },
);

app.listen(PORT, () => {
  console.log('Online');
});
