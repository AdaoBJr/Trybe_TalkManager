const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');

const { getTalker } = require('./getArquivo/getTalker');

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

app.get('/talker', async (_req, res) => {
  const content = (await getTalker());
  res.status(200).send(content);
});

app.get(
  '/talker/:id',
  rescue(async (req, res) => {
    const talker = (await getTalker());
    const falador = talker.find(({ id }) => id === Number(req.params.id));
    if (!falador) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    return res.status(200).json(falador);
  }),
);
