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

app.listen(PORT, () => {
  console.log('Online');
});
