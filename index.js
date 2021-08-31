const express = require('express');
const bodyParser = require('body-parser');

const talkerRouter = require('./routers/talkerRouter');

const app = express();
app.use(bodyParser.json());

const { isValidEmail, isValidPassword } = require('./middlewares/validations');
const generateToken = require('./helpers/generateToken');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.post('/login', isValidEmail, isValidPassword, (req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});

app.use('/talker', talkerRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
