const express = require('express');
const bodyParser = require('body-parser');
const micro = require('./micro');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const data = await micro.getTalker();
  response.status(HTTP_OK_STATUS).send(data);
});

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const { getTalkerID } = micro;
  const data = await getTalkerID(id);
  if (data) response.status(HTTP_OK_STATUS).send(data);
  response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', async (request, response) => {
  const { email, password } = request.body;
  const { validateEmail, validatePass } = micro;
  validateEmail(email, response);
  validatePass(password, response);
  response.status(200).json({ token: '7mqaVRXJSp886CGr' });
});

app.listen(PORT, () => {
  console.log('Online');
});
