const express = require('express');
const bodyParser = require('body-parser');

const {
  readContentFile,
  writeContentFile,
} = require('./helpers/readWriteFile');

const generateToken = require('./helpers/generateToken');

const { isValidEmail, isValidPassword } = require('./middlewares/validations');
const {
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalkWatchedAtRate,
  isValidTalk,
} = require('./middlewares/validationsTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const content = (await readContentFile()) || [];
  return res.status(200).send(content);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const content = (await readContentFile()) || [];

  const talker = await content.find((talk) => talk.id === Number(id));

  if (!talker) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  return res.status(200).json(talker);
});

app.post('/login', isValidEmail, isValidPassword, (req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});

app.post(
  '/talker',
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidTalkWatchedAtRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const content = (await readContentFile()) || [];
    const newTalker = { id: content.length + 1, name, age, talk };
    const newContent = [...content, newTalker];
    await writeContentFile(newContent);
    res.status(201).json(newTalker);
  },
);

app.put(
  '/talker/:id',
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidTalkWatchedAtRate,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;

    const content = (await readContentFile()) || [];
    const findTalker = content.find((talker) => talker.id === Number(id));
    const contentWithinId = content.filter(
      (talker) => talker.id !== Number(id),
    );
    const talkerUpdate = { ...findTalker, name, age, talk };
    const newContent = [...contentWithinId, talkerUpdate];
    await writeContentFile(newContent);
    res.status(200).json(talkerUpdate);
  },
);

app.listen(PORT, () => {
  console.log('Online');
});
