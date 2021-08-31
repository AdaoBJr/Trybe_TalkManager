import talker from './talker.json';

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', (req, res) => {
  fs.readFile('./talker.json', (err, content) => {
    if (err) {
      console.error(`Erro ao ler o arquivo: ${err.message}`);
      return;
    }
  
    console.log(`Arquivo lido com sucesso. Conteúdo: ${content}`);
  });

  return res.status(200).json(talker);
});