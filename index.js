const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const { emailValidation,
        passwordValidation,
      } = require('./authMiddleware');

const talkerRouter = require('./routes/talkerRouter');

// não remova esse endpoint, e para o avaliador funcionar;
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.post('/login', emailValidation, passwordValidation, async (request, response) => {
  response.status(HTTP_OK_STATUS).json({ token: randomBytes(8).toString('hex') });
});

app.use('/talker', talkerRouter);

app.listen(PORT, () => {
  console.log('Online');
});
