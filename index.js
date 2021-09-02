const express = require('express');
const bodyParser = require('body-parser');

const {
  getTalkers,
  setTalkers,
  editTalker,
  deleteTalker,
} = require('./functions/handleFile.js');
const {
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkRate,
  validateTalkWatchedAt,
  validateSearchParams,
  validateSearchQuery,
  // validateSearch,
} = require('./middlewares/validations.js');
const { createToken } = require('./functions/token.js');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
//

app.get('/talker', async (_req, res) => {
  const talkers = await getTalkers();
  res.status(HTTP_OK_STATUS).json(talkers);
});

app.get(
  '/talker/search',
  validateToken,
  validateSearchQuery,
  async (req, res) => {
    const { searchResult } = req;
    res.status(200).json(searchResult);
  },
);

app.get('/talker/:id', validateSearchParams, async (req, res) => {
  const { talker } = req;

  res.status(HTTP_OK_STATUS).json(talker);
});

app.post('/login', validateEmail, validatePassword, async (_req, res) => {
  res.status(HTTP_OK_STATUS).json({
    token: createToken(),
  });
});

app.post(
  '/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkRate,
  validateTalkWatchedAt,
  async (req, res) => {
    const { body } = req;

    const talker = await setTalkers(body);
    res.status(201).json(talker);
  },
);

app.put(
  '/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkRate,
  validateTalkWatchedAt,
  async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const talker = await editTalker(id, body);

    res.status(200).json(talker);
  },
);

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const response = await deleteTalker(id);

  res.status(200).json({
    message: response
      ? 'Pessoa palestrante deletada com sucesso'
      : 'Pessoa palestrante não encontrado',
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
