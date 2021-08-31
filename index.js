const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const { 
  isValidEmail,
  isValidPassword,
  isValidToken,
  isValidName,
  isValidAge,
  isValidDate,
  isValidRate,
  isValidTalk,
  createToken, 
} = require('./middlewares/validation');

const talkerJson = './talker.json';
fs.readFileSync(talkerJson);

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  fs.readFile(talkerJson, (err, content) => {
    if (err) {
      return res.status(200).json([]);
    }
    return res.status(200).json(JSON.parse(content.toString('utf8')));
  });
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  
  fs.readFile(talkerJson, 'utf8', (_err, content) => {    
    const data = JSON.parse(content);
    const findTalker = data.find((talker) => talker.id === Number(id));

    if (!findTalker) {
  return res.status(404).json({
       message: 'Pessoa palestrante não encontrada' }); 
}
  return res.status(200).json(findTalker);
  });
});

app.post('/login', isValidEmail, isValidPassword, (_req, res) => {
  const tokenCreated = createToken(16);
  res.status(200).json({ token: tokenCreated });
});

app.post('/talker', isValidToken, isValidName, isValidAge,
isValidTalk, isValidDate, isValidRate, (req, res) => {
  const { id, name, age, talk: { watchedAt, rate } } = req.body;
  
  fs.readFile(talkerJson, 'utf8', (_err, content) => {    
    const data = JSON.parse(content);
    
    data.push({ id, name, age, talk: { watchedAt, rate } });
    return res.status(201).json({ id, name, age, talk: { watchedAt, rate } });     
  });
});

app.put('/talker/:id', 
isValidToken, isValidName, isValidAge, isValidTalk, isValidDate, isValidRate, (req, res) => {
  fs.readFile(talkerJson, 'utf8', (_err, content) => {    
    const { id } = req.params;
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const contentData = JSON.parse(content);
    const talkIndex = contentData.findIndex((data) => data.id === Number(id));

    contentData[talkIndex] = { ...contentData[talkIndex], name, age, watchedAt, rate };

    res.status(200).end();
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
