const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs');

// fonte: https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original
const { promisify } = require('util');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// -------------- // --------------- //

app.get('/talker', (_req, res) => {  
  fs.readFile('./talker.json', 'utf-8', promisify((err, data) => {
    if (err) {
      res.status(HTTP_NOT_FOUND).send({ message: 'Not Found' });
      return;
    }
    res.status(200).send(data);
  }));
});

app.listen(PORT, () => {
  console.log('Online');
});
