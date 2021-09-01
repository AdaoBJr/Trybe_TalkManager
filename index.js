const express = require('express');
const bodyParser = require('body-parser');

const {
  getTalkers,
  getTalkerById,
  validationEmail,
  validationPassword,
  generateRandomToken,
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
