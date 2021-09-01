const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const talkerData = 'talker.json';

function readData() {
  try {
    const data = fs.readFileSync(talkerData, 'utf8');
    return data;
  } catch (err) {
    console.error(`Não foi possível ler o arquivo ${talkerData}\n Erro: ${err}`);
    process.exit(1);
  }
}

app.get('/talker', (req, res) => {
  const talkers = JSON.parse(readData());

  if (!talkers) return res.status(HTTP_OK_STATUS).json({});

  res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(readData());
  const talker = talkers.find((t) => t.id === parseInt(id, 10));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(HTTP_OK_STATUS).json(talker);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
