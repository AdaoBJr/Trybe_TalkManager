const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
// const talkers = require('./talker.json');
const {
  validateLogin,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
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

async function readFile() {
  return fs.readFile('./talker.json', 'utf-8');
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

app.get('/talker/search',
  validateToken,
  async (req, res) => {
  const { q } = req.query;
  const jsonTalkers = await readFile();
  const talkers = JSON.parse(jsonTalkers);
  const filteredTalker = talkers.filter(({ name }) => name.includes(q));
  // if (!q || q === '') {
  //   return res.status(200).json(talkers);
  // }
  // if (filteredTalker.length === 0) {
  //   return res.status(200).json([]);
  // }
  return res.status(200).json(filteredTalker);
});

// Developer Mozilla: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseInt
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const jsonConsultingFile = await readFile();
  const consultingFile = JSON.parse(jsonConsultingFile);
  const talker = consultingFile.find((obj) => obj.id === parseInt(id, 10));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).json(talker);
});

app.get('/talker', async (_req, res) => {
  const readTalkes = await readFile();
  const response = JSON.parse(readTalkes);
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

// const { name, age, talk.watchedAt, talk.rate } = req.body;
app.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const readTalkes = await readFile();
  const talkes = JSON.parse(readTalkes);
  const newTalker = {
    id: talkes.length + 1,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  talkes.push(newTalker);
  const writeTalkers = JSON.stringify(talkes);
  await fs.writeFile('./talker.json', writeTalkers);
  return res.status(201).json(newTalker);
});

app.put('/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const jsonReadTalkes = await readFile();
    const readTalkes = JSON.parse(jsonReadTalkes);

    const newTalker = { id: parseInt(id, 10), name, age, talk: { watchedAt, rate } };
    const updatedTalker = readTalkes.map((t) => ((t.id === parseInt(id, 10)) ? newTalker : t));

    const writeTalkers = JSON.stringify(updatedTalker);
    await fs.writeFile('./talker.json', writeTalkers);
    return res.status(200).json(newTalker);
  });

  // async (req, res) => {
  //   const { id } = req.params;
  //   const { name, age, talk: { watchedAt, rate } } = req.body;
  //   const jsonReadTalkes = await readFile();
  //   console.log('Linha 123', jsonReadTalkes);
  //   const readTalkes = await JSON.parse(jsonReadTalkes);
  //   console.log('Linha 125', readTalkes);
  //   const talkerIndex = readTalkes.findIndex((t) => t.id === parseInt(id, 10));
  //   console.log('Linha 127', talkerIndex);
  //   const talker = readTalkes.find((t) => t.id === parseInt(id, 10));
  //   console.log('Linha 129', talker);
  //   readTalkes[talkerIndex] = { id: Number(id), name, age, talk: { watchedAt, rate } };
  //   const replacedItem = readTalkes.splice(readTalkes.indexOf(talker), 1, readTalkes[talkerIndex]);
  //   console.log('Linha 130', readTalkes[talkerIndex]);
  //   console.log('Linha 131', replacedItem);
  //   console.log('Linha 134', readTalkes);
  //   const writeTalkers = JSON.stringify(readTalkes);
  //   await fs.writeFile('./talker.json', writeTalkers);
  //   return res.status(200).json(readTalkes[talkerIndex]);
  // }

  // https://stackoverflow.com/questions/5915789/how-to-replace-item-in-array

  // const removingOldFile = readTalkes.splice(talkerIndex, 1);
  // console.log('Linha 132', removingOldFile);
  // const puttingUpdatedFile = removingOldFile.push(readTalkes[talkerIndex]);
  // console.log('Linha 134', puttingUpdatedFile);

  // readTalkes[talkerIndex] = { ...readTalkes[talkerIndex], name, age, talk: { watchedAt, rate } };

  // (req, res) => {
  //   const { id } = req.params;
  //   const { name, age, talk: { watchedAt, rate } } = req.body;
  //   const talkerIndex = talkers.findIndex((t) => t.id === parseInt(id, 10));

  //   // talkers[talkerIndex] = { id: Number(id), name, age, talk: { watchedAt, rate } };
  //   talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk: { watchedAt, rate } };

  //   // const xxx = JSON.stringify(talkers);
  //   // await fs.writeFile('./talker.json', xxx);
  //   // console.log(typeof xxx, talkerIndex, 'LINHA 122');

  //   return res.status(200).json(talkers[talkerIndex]);
  // }

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const jsonLookingForTalker = await readFile();
  const lookingForTalker = JSON.parse(jsonLookingForTalker);

  const deleteTalker = lookingForTalker.filter((t) => t.id !== parseFloat(id, 10));

  const writeTalkers = JSON.stringify(deleteTalker);
  await fs.writeFile('./talker.json', writeTalkers);
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});
// const talkerIndex = lookingForTalker.findIndex((t) => t.id === parseInt(id, 10));
// lookingForTalker.slice(talkerIndex, 1);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
