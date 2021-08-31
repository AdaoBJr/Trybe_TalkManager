const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const { getTalkers } = require('./utils/talker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', rescue(async (req, res) => {
  const talkers = await getTalkers();
  return res.status(HTTP_OK_STATUS).json(talkers);
}));

app.listen(PORT, () => {
  console.log('Online');
});
