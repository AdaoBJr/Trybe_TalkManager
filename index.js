const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// function readFiles() {

// }

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  fs.readFile('./talker.json', 'utf8')
    .then((content) => res.status(200).send(JSON.parse(content)))
    .catch((err) => res.status(401)
    .json({ message: `Not possible to read file... Error ${err.message}` }));
});

// app.get('/talker/:id', (req, res) => {
//   const { id } = req.params;
//   console.log(id);
//   fs.readFile('./talker.json', 'utf8').then((talkerList) => {
//     const response = talkerList.find((el) => el.id === id);
//     if (!response) {
//     return res.status(404).json({
//       message: 'Pessoa palestrante não encontrada',
//     }); 
//   }
//     return res.status(200).send(JSON.parse(response));
//   });
// });

app.listen(PORT, () => {
  console.log('Online');
});
