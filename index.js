const express = require('express');
const fs = require('fs').promises;
const rescue = require('express-rescue');
const {
  validateEmail,
  validatePassword,
  validateToken,
} = require('./helper/middleware');
// const { readFile } = require('./helper/ fileHandling');

const fileTalker = 'talker.json';

const app = express();
app.use(express.json());

app.use((err, request, response, _next) => response.status(500)
  .json({ error: `Erro: ${err.message}` }));

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  return response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const talkers = await fs.readFile(fileTalker, 'utf-8');
  const jsonTalkers = JSON.parse(talkers);
  const getById = jsonTalkers.find((talker) => talker.id === parseInt(id, 10));

  if (!getById) {
    return response.status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  
  return response.status(HTTP_OK_STATUS).json(getById);
});

app.get('/talker', rescue(async (_request, response) => {
  const talker = await fs.readFile(fileTalker, 'utf-8');

  if (talker === null) return response.status(200).json([]);

  return response.status(HTTP_OK_STATUS).json(JSON.parse(talker));
}));

app.post('/talker', validateToken, (request, response) => {
  return response.status(201).json({ message: 'OK' });
});

app.post('/login', validateEmail, validatePassword, (_request, response) => {
  const token = Math.random().toString(16).substr(2, 8) + Math.random().toString(16).substr(2, 8);

  return response.status(HTTP_OK_STATUS).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
