const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
// const rescue = require('express-rescue');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  fs.readFile('./talker.json', 'utf8')
    .then((content) => res.status(200).send(JSON.parse(content)))
    .catch((err) => res.status(401)
    .json({ message: `Unable to read file... Error ${err.message}` }));
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile('./talker.json', 'utf-8')
    .then((content) => JSON.parse(content))
    .then((content) => {
      const talkerIndex = content.findIndex((talker) => talker.id === Number(id));
      if (talkerIndex === -1) {
        return res.status(404).json({
          message: 'Pessoa palestrante não encontrada',
        });
      }
      return res.status(200).send(content[talkerIndex]);
  })
    .catch((_err) => res.status(404)
    .json({ message: 'Pessoa palestrante não encontrada' }));
});

app.listen(PORT, () => {
  console.log('Online');
});
