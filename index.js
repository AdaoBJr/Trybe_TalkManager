const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const middlewares = require('./middlewares');
const validations = require('./validations/validations');

const app = express();
app.use(bodyParser.json());
const showTalkers = 'talker.json';

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  const data = JSON.parse(fs.readFileSync(showTalkers, 'utf-8'));
  if (!data.length) {
    return res.status(200).json([]);
  }
  res.status(200).json(data);
});

app.get('/talker/search', (req, res) => {
  const data = JSON.parse(fs.readFileSync(showTalkers, 'utf-8'));
  const { authorization } = req.headers;
  const { q: search } = req.query;
  try {
    validations.validateToken(authorization);
    const filteringTalker = data.filter((talker) => talker.name.includes(search));
    if (!search || search === '') return res.status(200).json(app.get('/talker'));
    return res.status(200).json(filteringTalker);
  } catch (error) {
    if (error.message.includes('Token')) return res.status(401).json({ message: error.message });
    res.status(400).json({ message: error.message });
  }
});

app.get('/talker/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(showTalkers, 'utf-8'));
  const talkerById = data.find((talker) => parseInt(talker.id, 0) === parseInt(req.params.id, 0));
  if (!talkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talkerById);
});

app.post('/login', middlewares.login);

app.post('/talker', (req, res) => {
  const data = JSON.parse(fs.readFileSync(showTalkers, 'utf-8'));
  const { authorization } = req.headers;
  const { name, age, talk } = req.body;
  const element = req.body;
  try {
    validations.validateToken(authorization);
    validations.allValidated(element);
    data.push({ name, age, id: data.length + 1, talk });
    fs.writeFileSync(`${__dirname}/./talker.json`, JSON.stringify(data));
    res.status(201).json(data[data.length - 1]);
  } catch (error) {
    if (error.message.includes('Token')) return res.status(401).json({ message: error.message });
    res.status(400).json({ message: error.message });
  }
});

app.put('/talker/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(showTalkers, 'utf-8'));
  const { authorization } = req.headers;
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const element = req.body;
  try {
    validations.validateToken(authorization);
    validations.allValidated(element);
    data[id - 1].name = name;
    data[id - 1].age = age;
    data[id - 1].talk = talk;
    fs.writeFileSync(`${__dirname}/./talker.json`, JSON.stringify(data));
    return res.status(200).json(data[id - 1]);
  } catch (error) {
    if (error.message.includes('Token')) return res.status(401).json({ message: error.message });
    res.status(400).json({ message: error.message });
  }
});

app.delete('/talker/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(showTalkers, 'utf-8'));
  const { authorization } = req.headers;
  const { id } = req.params;
  validations.validateToken(authorization);
  const index = Number(id - 1);
  data.splice(index, 1);
  try {
    fs.writeFileSync(`${__dirname}/./talker.json`, JSON.stringify(data));
    return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (error) {
    if (error.message.includes('Token')) return res.status(401).json({ message: error.message });
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
