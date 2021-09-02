const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');

const { getTalker } = require('./arquivo/getTalker');
const {
  verificarInfo,
  generateToken,
  validateToken,
  validateName,
  validateAge,
  checkTalk,
  checkDate,
  checkRate,
  addNewTalker,
} = require('./verificar');

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

app.get('/talker', async (_req, res) => {
  const content = (await getTalker());
  res.status(200).send(content);
});

app.get(
  '/talker/:id',
  rescue(async (req, res) => {
    const talker = (await getTalker());
    const falador = talker.find(({ id }) => id === Number(req.params.id));
    if (!falador) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(falador);
  }),
);

app.post('/login', (req, res) => {
  const token = { token: generateToken(16) };
  const { email, password } = req.body;
  verificarInfo(email, password, res);
  return res.status(200).json(token);
});

app.post('/talker', [
  validateToken,
  validateName,
  validateAge,
  checkTalk,
  checkDate,
  checkRate,
  addNewTalker,
]);
