const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const talkerData = 'talker.json';

async function readData() {
  try {
    const data = await fs.readFile(talkerData, 'utf8');
    return data;
  } catch (err) {
    console.error(`Não foi possível ler o arquivo ${talkerData}\n Erro: ${err}`);
    process.exit(1);
  }
}

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talkers = await readData();

  if (!talkers) return res.status(200).json({});

  res.status(200).json(talkers);
});

app.listen(PORT, () => {
  console.log('Online');
});
