const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  const talkers = JSON.parse(fs.readFileSync(`${__dirname}/../talker.json`));
   res.status(200).json(talkers);
});

app.get('/:id', (req, res) => {
  const idParam = req.params.id;
  const talkers = JSON.parse(fs.readFileSync(`${__dirname}/../talker.json`));
  const talker = talkers.find(({ id }) => id === Number(idParam));
  if (talker) {
    return res.status(200).json(talker);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = app;
