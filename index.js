const express = require('express');
const bodyParser = require('body-parser');
const getTalkers = require('./middlewares/index');

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

// --------------------------------------------------------
// 1º Requisito:

app.get('/talker', getTalkers);

// --------------------------------------------------------
// 2º Requisito:

// app.get('/talker/:id', (req, res) => {
//   const { id } = req.params;
//   const talker = talkers.find((e) => e.id === Number(id));

//   if (!talker) {
//     return res.status(404).json({
//       message: 'Pessoa palestrante não encontrada' });
//   }
//   return res.status(HTTP_OK_STATUS).json({ talker });
// });

// --------------------------------------------------------
