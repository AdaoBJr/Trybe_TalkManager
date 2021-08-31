const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');

const fs = require('fs').promises;

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

router.get('/', async (req, res) => {
  try {
  const talk = await fs.readFile('./talker.json', 'utf8');
  return res.status(200).json(talk);
  } catch (error) {
    return res.status(200).json([]);
  }
});
