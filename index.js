const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const talkers = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  fs.readFile(talkers, 'utf-8', (err, data) => {
    if (err) {
      res.status(200).json([]);
    }
    const content = JSON.parse(data);
    res.status(200).json(content);
  });
});

app.get('/talker/:id', (req, res) => {
  fs.readFile(talkers, 'utf-8', (err, data) => {
    if (err) {
      res.status(200).json([]);
    }
    const content = JSON.parse(data);
    const { id } = req.params;
    const idContent = content.find((c) => c.id === Number(id));
    if (!idContent) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(idContent);
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
