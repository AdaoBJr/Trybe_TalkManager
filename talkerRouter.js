const express = require('express');
const fs = require('fs').promises;
const readFileFs = require('./helpers/readFIle');
const overwriteWriteFile = require('./helpers/writeFile');
const {
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyWatchedAt,
  verifyRate,
} = require('./validatorsMiddlewares');

const route = express.Router();

const talkerJsonPath = './talker.json';

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;

route.get('/search',
  verifyToken,
  async (req, res) => {
    const { q } = req.query;
    const fileObject = await readFileFs(talkerJsonPath);
    if (!q
    || q === '') return req.status(HTTP_OK_STATUS).json(fileObject);
    const filteredTalkers = fileObject.filter(({ name }) => name.includes(q));
    console.log(filteredTalkers);
    res.status(HTTP_OK_STATUS).json(filteredTalkers);
  });
  
  route.delete('/:id',
  verifyToken,
  async (req, res) => {
  const { id } = req.params;
  const excludedPerson = 'Pessoa palestrante deletada com sucesso';
  const fileObject = await readFileFs(talkerJsonPath);
  const newObj = fileObject.filter(({ id: talkerId }) => Number(id) !== Number(talkerId));
  overwriteWriteFile('talker.json', newObj);
  res.status(HTTP_OK_STATUS).json({ message: excludedPerson });
});

route.put('/:id',
verifyToken,
verifyName,
verifyAge,
verifyTalk,
verifyRate,
verifyWatchedAt,
async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const fileObject = await readFileFs(talkerJsonPath);
  let newTalker = {};
  const newObj = fileObject.map((talker) => {
    if (talker.id === Number(id)) {
      const newId = Number(talker.id);
      console.log('type of newid', typeof newId);
      newTalker = { age, id: newId, name, talk };
      return newTalker;
    }
    return talker;
  });
  overwriteWriteFile('talker.json', newObj);
  res.status(HTTP_OK_STATUS).json(newTalker);
});

route.get('/:id', async (req, res) => {
  const { id } = req.params;
  const fileObject = await readFileFs(talkerJsonPath);
  const choosenTalker = fileObject.find((talker) => Number(id) === talker.id);
  if (!choosenTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(choosenTalker);
});

route.post('/',
verifyToken,
verifyName,
verifyAge,
verifyTalk,
verifyRate,
verifyWatchedAt,
async (req, res) => {
  const { name, age, talk } = req.body;
  const objArchive = await readFileFs(talkerJsonPath);
  const nextId = objArchive.reduce((acc, { id }) => {
    let newId = acc;
    if (id > acc) {
      newId = id;
    }
    return newId;
  }, 0) + 1;
  const newTalker = { id: nextId, name, age, talk };
  const newObj = [...objArchive, newTalker];
  overwriteWriteFile('talker.json', newObj);
  res.status(HTTP_CREATED_STATUS).json(newTalker);
});

route.get('/', async (_request, response) => {
  const fileResponse = await fs.readFile(talkerJsonPath, 'utf-8');
  response.status(200).json(JSON.parse(fileResponse));
});

module.exports = route;