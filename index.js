const express = require('express');
const { HTTP_OK_STATUS } = require('./helper/httpStatus');

const app = express();
app.use(express.json());

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => response.status(HTTP_OK_STATUS).send());

const { login, talker } = require('./routers');

app.use('/talker', talker);
app.use('/login', login);

app.listen(PORT, () => {
  console.log('Online');
});
