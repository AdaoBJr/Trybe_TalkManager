const fs = require('fs').promises;
const rescue = require('express-rescue');
// const util = require('util');
const express = require('express');
const bodyParser = require('body-parser');
// const { json } = require('body-parser');
const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

async function getTalker() {
  const resConvert = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(resConvert);
}

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send('Diretorio Raiz');
});
// está escutando as requisições feitas pelos usuários.
app.get('/talker', async (_request, response) => {
  const talker = await getTalker();
  response.status(HTTP_OK_STATUS).send(talker);
});

app.get('/talker/:id', rescue(async (_request, response) => {
  const { id } = _request.params;
  const talker = await getTalker();
  const responseForUse = talker.find((AllTalkers) => AllTalkers.id === Number(id));
  if (!responseForUse) {
    return response.status(404).send({
      message: 'Pessoa palestrante não encontrada',
    });
  }
    return response.status(HTTP_OK_STATUS).send(responseForUse);
}));

app.listen(PORT, () => {
  console.log('Online');
});

/* ... */

// app.get(
//   '/simpsons/:id',
//   rescue(async (req, res) => {
//     const simpsons = await simpsonsUtils.getSimpsons();

//     const simpson = simpsons.find(({ id }) => id === req.params.id);

//     if (!simpson) {
//       return res.status(404).json({ message: 'simpson not found' });
//     }

//     return res.status(202).json(simpson);
//   })
// );

/* ... */