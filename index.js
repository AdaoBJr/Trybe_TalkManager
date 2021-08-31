const express = require('express');
const bodyParser = require('body-parser');

const { readTalkerJson } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const palestrantes = await readTalkerJson();

  res.status(200).json(palestrantes);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const palestrantes = await readTalkerJson();

  const getPalestranteByID = palestrantes.filter((palestrante) => 
     palestrante.id === parseInt(id, 10));

  if (!getPalestranteByID.length) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(...getPalestranteByID);
});

app.listen(PORT, () => {
  console.log('Online');
});
