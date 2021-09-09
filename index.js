const express = require('express');
const bodyParser = require('body-parser');
const err = require('./err/errorMiddleware');
const talkerRouter = require('./routers/talkerRouter');
const loginRouter = require('./routers/loginRouter');

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

app.use('/login', loginRouter);
app.use('/talker', talkerRouter);

app.use('*', (_req, _res, next) => next({ statusCode: 404, message: '404 - page not found :(' }));
app.use(err);