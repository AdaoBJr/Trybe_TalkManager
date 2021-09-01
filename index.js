const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs');
const util = require('util');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile('./talker.json', 'utf-8', util.promisify((err, content) => {
    const data = content.filter((cont) => cont.id === id);
    if (data.length === 0) {
      res.status(HTTP_OK_STATUS).json(Array.from([]));
    }
    res.status(HTTP_OK_STATUS).send(data);
  }));
});

app.get('/talker', (req, res) => {
  fs.readFile('./talker.json', 'utf-8', util.promisify((err, content) => {
    if (content.length === 0) {
      res.status(HTTP_OK_STATUS).send([]);
    }
    const data = JSON.parse(content);
    if (data.length === 0) {
      res.status(HTTP_OK_STATUS).json(Array.from([]));
    }
    res.status(HTTP_OK_STATUS).send(data);
  }));
});
