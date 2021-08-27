const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const {
  authMiddleware,
  talkerPostValidator,
  nameAgeValidator,
  talkObjValidator1,
  talkObjValidator2,
} = require('./middlewares');
const {
  getTalkerData,
  addTalkerData,
  findTalkerById,
  generateRandomToken,
  editTalkerById,
  deleteTalkerById,
  searchTalkerByQuery,
} = require('./fs-utils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talkerData = await getTalkerData();
  if (talkerData.length > 0) {
    return res.status(200).json(talkerData);
  }
  if (talkerData.length === 0) {
    return res.status(200).json([]);
  }
});

app.get('/talker/search', talkerPostValidator, async (req, res) => {
  const queryResult = await searchTalkerByQuery(req.query.q);
  return res.status(200).json(queryResult);
});

app.get('/talker/:id', async (req, res) => {
  const searchResult = await findTalkerById(req.params.id);
  if (searchResult) {
    return res.status(200).json(searchResult);
  } 
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', authMiddleware, async (req, res) =>
  res.status(200).json({ token: generateRandomToken() }));

app.post(
  '/talker',
  talkerPostValidator,
  nameAgeValidator,
  talkObjValidator1,
  talkObjValidator2,
  async (req, res) => {
    const newTalker = await addTalkerData(req.body);
    return res.status(201).json(newTalker);
  },
);

app.put(
  '/talker/:id',
  talkerPostValidator,
  nameAgeValidator,
  talkObjValidator1,
  talkObjValidator2,
  async (req, res) => {
    const updatedTalker = await editTalkerById(req.body, req.params.id);
    return res.status(200).json(updatedTalker);
  },
);

app.delete('/talker/:id', talkerPostValidator, async (req, res) => {
  await deleteTalkerById(req.params.id);
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => {
  console.log('Online');
});
