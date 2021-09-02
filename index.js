const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs').promises;

const readTalkers = () => fs.readFile('./talker.json', 'utf8');

const HTTP_OK_CREATED = 201;

const {
  getTalkers,
  getTalkerById,
  validationEmail,
  validationPassword,
  generateRandomToken,
  validationToken,
  validationName,
  validationAge,
  validationTalk,
  validationRate,
  validationDateWatchedAt,
} = require('./middlewares/index'); 

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

app.get('/talker/:id', getTalkerById);

app.get('/talker', getTalkers);

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const validateEmail = validationEmail(email);
  const validatePassword = validationPassword(password);
  console.log(email, password);
  console.log(validationEmail(email), validationPassword(password));

  // Estava fazendo assim mas deu erro
  // if (validateEmail.includes('O')) res.status(400).json(validateEmail);
  // if (validatePassword.includes('O')) res.status(400).json(validatePassword);

  if (validateEmail !== 'email ok') res.status(400).json(validateEmail);
  if (validatePassword !== 'password ok') res.status(400).json(validatePassword);

  res.status(200).json({
    token: generateRandomToken(),
  });
});

app.post('/talker',
validationToken,
validationName,
validationAge,
validationTalk,
validationRate,
validationDateWatchedAt,
async (req, res) => {
  const { name, age, talk } = req.body;
  const data = await readTalkers()
  .then((talkers) => JSON.parse(talkers));
  const talkersLength = data.length;
  const newTalker = {
    id: talkersLength + 1,
    name,
    age,
    talk,
  };
  data.push(newTalker);
  await fs.writeFile('./talker.json', JSON.stringify(data));
  console.log(newTalker);
  return res.status(HTTP_OK_CREATED).send(newTalker);
});
