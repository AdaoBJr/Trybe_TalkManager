const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const { emailValidation,
  passwordValidation,
} = require('./middleware');
const talkerRouter = require('./routes/talkerRouter');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.post('/login', emailValidation, passwordValidation, async (request, response) => {
  const token = randomBytes(8).toString('hex');
  response.status(HTTP_OK_STATUS).json({ token });
});

app.use('/talker', talkerRouter);
app.listen(PORT, () => {
  console.log('Online');
});
