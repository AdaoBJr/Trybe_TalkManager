const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs'); // importei
const { promisify } = require('util'); // 

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

/* ==================== */
app.get('/talker', (req, res) => {
  fs.readFile('/talker.json', 'utf-8', promisify((err, content) => {
    if (err) {
      res.status(400).send({ message: 'Not found' });
      return;
    }
    res.send(200).send(content);
  }));
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
