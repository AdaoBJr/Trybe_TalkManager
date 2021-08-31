const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const fs = require('fs');
const { promisify } = require('util');
// const { promisify } = require('util');

// const talkers = '/talker.json';

const HTTP_OK_STATUS = 200;
// const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// -------------- // --------------- //

app.get('/talker', (req, res) => {  
  fs.readFile('./talker.json', 'utf-8', promisify((err, content) => {
    if (err) {
      res.status(400).send({ message: 'Not Found' });
      return;
    }
    console.log('err', err);
    console.log('cont', content);
    res.status(200).send(content);
  }));
});

// app.get('/talker', (req, res) => {  
//   const read = async () => {
//     const talkerList = await fs.readFile(talkers, 'utf-8');
//     return talkerList;
//   };
//   return res.status(HTTP_OK_STATUS).json(read());
// });

app.listen(PORT, () => {
  console.log('Online');
});
