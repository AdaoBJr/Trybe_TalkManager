const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs').promises;
// const util = require('util');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const talkerCaller = async () => {
  const data = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(data);
};

// app.get('/talker/:id', (req, res) => {
//   fs.readFile('./talker.json', 'utf-8', util.promisify((err, content) => {
//     if (err) {
//       return err;
//     }
//     const { id } = req.params;
//     const data = content.find((c) => c.id === Number(id));
//     return res.status(HTTP_OK_STATUS).json(data);
//   }));
// });

// app.get('/talker', (req, res) => {
//   fs.readFile('./talker.json', 'utf-8', util.promisify((err, content) => {
//     if (err) {
//       res.status(HTTP_OK_STATUS).send([]);
//     }
//     const data = JSON.parse(content);
//     if (data.length === 0) {
//       res.status(HTTP_OK_STATUS).json(Array.from([]));
//     }
//     res.status(HTTP_OK_STATUS).send(data);
//   }));
// });

app.get('/talker', async (req, res) => {
  const data = await talkerCaller();
  if (data.length === 0) return res.status(HTTP_OK_STATUS).send([]);
  res.status(HTTP_OK_STATUS).send(data);
});

app.listen(PORT, () => {
  console.log('Online');
});
