const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const talkers = require('./talker.json');
const {
  validateLogin,
  validateToken,
  validateName,
  validateAge,
  validateWatchedAt,
  validateRate,
  validateTalk,
} = require('./auth-middleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// https://www.ti-enxame.com/pt/javascript/crie-um-token-aleatorio-em-javascript-com-base-nos-detalhes-do-usuario/941136694/
function generateToken(length) {
  // edit the token allowed characters
  const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  const b = [];
  for (let i = 0; i < length; i += 1) {
      const j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
  }
  return b.join('');
}

// app.use(
//   validateLogin,
//   validateToken,
//   validateName,
//   validateAge,
//   validateWatchedAt,
//   validateRate,
//   validateTalk,
// );

// app.get('/talker/search?q=searchTerm', (req, res) => {
//   const { q } = req.query;
//   const filteredTalker = talkers.filter((t) => t.name.includes(q));
// });

// Developer Mozilla: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseInt
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = talkers.find((obj) => obj.id === parseInt(id, 10));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).json(talker);
});

app.get('/talker', async (_req, res) => {
  const readTalkes = await fs.readFile('./talker.json', 'utf-8');
  const response = await JSON.parse(readTalkes);
  return res.status(200).json(response);

  // try {
  //   const readTalkes = await fs.readFile('./talker.json', 'utf-8');
  //   const response = await JSON.parse(readTalkes);
  //   return res.status(200).json(response);
  // } catch (error) {
  //   return res.status(500).json({ error: `Erro: ${err.message}` });
  // }

  // if (talkers.length === 0) return res.status(200).json([]);
  // return res.status(200).json(talkers);
});

app.post('/login', validateLogin, (_req, res) => {
  const token = { token: generateToken(16) };
  return res.status(200).json(token);
});

app.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
  // const { name, age, watchedAt, rate } = req.body;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const readTalkes = await fs.readFile('./talker.json', 'utf-8');
  const talkes = await JSON.parse(readTalkes);
  const newTalker = {
    id: talkers.length + 1,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  talkes.push(newTalker);
  const writeTalkes = JSON.stringify(talkes);
  fs.writeFile('./talker.json', writeTalkes);
  return res.status(201).json(newTalker);
});

app.put('/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateWatchedAt,
  validateRate,
  validateTalk,
  (req, res) => {
    const { id } = req.params;
    const { name, age, watchedAt, rate } = req.body;
    const talkerIndex = talkers.findIndex((t) => t.id === parseInt(id, 10));

    talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, watchedAt, rate };

    return res.status(200).end(talkers[talkerIndex]);
});

app.delete('/talker/:id', validateToken, (req, res) => {
  const { id } = req.params;
  const talkerIndex = talkers.findIndex((t) => t.id === parseInt(id, 10));

  talkers.slice(talkerIndex, 1);

  return res.status(200).end({ message: 'Pessoa palestrante deletada com sucesso' });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
