const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const { getAllTalkers, getTalkerById } = require('./readFile.js');

// não remova esse endpoint, e para o avaliador funcionar;
app.get('/', (_req, res) => {
  res.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
    const allTalkers = await getAllTalkers();
    res.status(HTTP_OK_STATUS).json(allTalkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getTalkerById(id);
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talker);
});

app.listen(PORT, () => {
  console.log('Now live running at Port 3000!');
});
