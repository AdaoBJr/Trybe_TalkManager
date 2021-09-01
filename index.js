const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/userRouter');

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

app.use('/', router);

// const talkerCaller = async () => {
//   const data = await fs.readFile('./talker.json', 'utf-8');
//   return JSON.parse(data);
// };

// app.get('/talker', async (req, res) => {
//   const data = await talkerCaller();
//   res.status(HTTP_OK_STATUS).send(data);
// });

// app.get('/talker/:id', async (req, res) => {
//   const data = await talkerCaller();
//   const { id } = req.params;
//   const result = data.find((c) => c.id === Number(id));
//   if (!result) {
//   return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
//   }
//   res.status(HTTP_OK_STATUS).send(result);
// });

app.listen(PORT, () => {
  console.log('Online');
});
