const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
// npm run restore

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
  editTalker,
  deleteId,
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

app.get('/talker/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const talkers = await getTalker();
  if (!q) return res.status(200).json(talkers);
  const findTalkers = talkers.filter((talker) => talker.name.includes(q));

  return res.status(200).json(findTalkers);
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

app.put('/talker/:id', [
  validateToken,
  validateName,
  validateAge,
  checkTalk,
  checkDate,
  checkRate,
  editTalker,
]);

app.delete('/talker/:id', [
  validateToken,
  deleteId,
]);