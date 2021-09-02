const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTPP_ERROR_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res, next) => {
  try {
    const file = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));

    res.status(HTTP_OK_STATUS).json(file);

    next();
  } catch (err) {
    next({
      status: HTPP_ERROR_STATUS,
      message: err,
    });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
