const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const talkers = require('./talker.json');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Developer Mozilla: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseInt
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = talkers.find((obj) => obj.id === parseInt(id, 10));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).json(talker);
});

app.get('/talker', async (_req, res) => {
    const file = await fs.readFile('./talker.json', 'utf-8');
    const response = await JSON.parse(file);
    return res.status(200).json(response);

  // try {
  //   const file = await fs.readFile('./talker.json', 'utf-8');
  //   const response = await JSON.parse(file);
  //   return res.status(200).json(response);
  // } catch (error) {
  //   return res.status(500).json({ error: `Erro: ${err.message}` });
  // }

  // if (talkers.length === 0) return res.status(200).json([]);
  // return res.status(200).json(talkers);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
