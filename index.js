const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { getTalkers, filterTalker } = require('./handleFile.js');
const { validateEmail, validatePassword } = require('./middlewares/validations.js');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkers = await getTalkers();
  res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await filterTalker(id);
  if (!talker) {
  return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' }); 
}
  res.status(HTTP_OK_STATUS).json(talker);
});

app.post('/login', validateEmail, validatePassword, async (_req, res) => {
  res.status(HTTP_OK_STATUS).json({
    token: crypto.randomBytes(8).toString('hex'),
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
