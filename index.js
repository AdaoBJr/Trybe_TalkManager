const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const { getAllTalkers } = require('./requirements/functions');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', async (_req, res) => {
  const talkers = await getAllTalkers();
  if (!talkers) {
    return res.status(200).json([]);
  }
    return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const talkers = await getAllTalkers();
  const { id } = req.params;
  const getId = talkers.find((talkerId) => talkerId.id === parseInt(id, 10));
  if (!getId) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
    return res.status(200).json(getId);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
