const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const HTTP_CODES = {
  SUCCESS: 200,
  NOT_FOUND: 404
}

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => console.log('Online'));

app.get('/talker', async (_req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  const result = await JSON.parse(talkers);
  
  res.status(HTTP_CODES.SUCCESS).json(result);
})
