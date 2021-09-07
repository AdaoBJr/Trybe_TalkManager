const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
// const talker = require('./talker.json');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

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

  // if (talker.length === 0) return res.status(200).json([]);
  // return res.status(200).json(talker);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
