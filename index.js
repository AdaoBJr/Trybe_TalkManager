const express = require('express');
const bodyParser = require('body-parser');
const talkers = require('./routes/index');
const login = require('./routes/loginRoutes');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkers);
app.use('/login', login);

app.listen(PORT, () => {
  console.log('Online');
});
