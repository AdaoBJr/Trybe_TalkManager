const crypto = require('crypto');
const handleReadFile = require('../helpers/handleReadFile');
const handleWriteFile = require('../helpers/handleWriteFile');
const validateEmail = require('../helpers/validateEmail');
const validatePassword = require('../helpers/validatePassword');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED = 201;
const HTTP_BAD_REQUEST = 400;
// const HTTP_UNAUTHORIZED = 401;
const HTTP_NOT_FOUND = 404;

// --------------------------------------------------------
// 1º Requisito:

const getTalkers = (_req, res) => {
  handleReadFile()
  .then((talkers) => JSON.parse(talkers))
  .then((talkers) => res.status(HTTP_OK_STATUS).json(talkers))
  .catch((err) => res.status(HTTP_BAD_REQUEST).json({ message: `Error ${err}` }));
};

// --------------------------------------------------------
// 2º Requisito:

const getTalkerByID = (req, res) => {
  const { id } = req.params;

  handleReadFile()
  .then((talkers) => JSON.parse(talkers))
  .then((talkers) => {
    const talker = talkers.find((e) => e.id === Number(id));
    
    if (!talker) {
      return res.status(HTTP_NOT_FOUND).json({
        message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(HTTP_OK_STATUS).json(talker);
  })
  .catch((err) => res.status(HTTP_BAD_REQUEST).json({ message: `Error ${err}` }));
};

// --------------------------------------------------------
// 3º Requisito:

const getToken = (req, res) => {
  const { email, password } = req.body;

  if (validateEmail(email) === 'empty') {
    res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });    
  }
  if (validateEmail(email) === 'invalid') {
    res.status(HTTP_BAD_REQUEST).json({
      message: 'O "email" deve ter o formato "email@email.com"',
   });
  }
  if (validatePassword(password) === 'empty') {
    res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "password" é obrigatório' });
  }
  if (validatePassword(password) === 'invalid') {
    res.status(HTTP_BAD_REQUEST).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(HTTP_OK_STATUS).json({ token });
};

// --------------------------------------------------------
// 4º Requisito:

const postTalker = (req, res) => {
  handleReadFile()
  .then((talkers) => JSON.parse(talkers))
  .then((talkers) => {
    const newTalker = {
      ...req.body,
      id: talkers.length + 1,
    };
    talkers.push(newTalker);
    handleWriteFile(talkers)
    .then(() => res.status(HTTP_CREATED).json({ ...newTalker }))
    .catch((err) => res.status(HTTP_BAD_REQUEST).json(err));
  })
  .catch((err) => res.status(HTTP_BAD_REQUEST).json(err));
};

// --------------------------------------------------------
// 5º Requisito:

// Source: https://app.betrybe.com/course/back-end/introducao-ao-desenvolvimento-web-com-nodejs/express-middlewares/0ba5165f-5fda-4b6b-8de7-d2ccf5782c18/conteudos/e0470c45-ed25-49b8-9675-47bb00b17e42/middlewares/569b400a-f13c-4cee-bad2-bce01348baab?use_case=side_bar
const putTalker = (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;

  handleReadFile()
  .then((talkersList) => JSON.parse(talkersList))
  .then((talkersList) => {
    const talkers = talkersList;
    const talkerIndex = talkers.findIndex((e) => e.id === Number(id));
    
    if (talkerIndex === -1) {
      return res.status(HTTP_NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
    }
    talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk: { watchedAt, rate } };
    handleWriteFile(talkers)
    .then(() => res.status(HTTP_OK_STATUS).json(talkers[talkerIndex]))
    .catch((err) => res.status(HTTP_BAD_REQUEST).json(err));
  })
  .catch((err) => res.status(HTTP_BAD_REQUEST).json({ message: `Error ${err}` }));
};

// --------------------------------------------------------
// 6º Requisito:

const deleteTalker = (req, res) => {
  const { id } = req.params;
  handleReadFile()
  .then((talkers) => JSON.parse(talkers))
  .then((talkers) => {
    const talkerIndex = talkers.findIndex((e) => e.id === Number(id));

    if (talkerIndex === -1) {
      return res.status(HTTP_NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
    }
    talkers.splice(talkerIndex, 1);
    handleWriteFile(talkers)
    .then(() => res.status(HTTP_OK_STATUS).json(
      { message: 'Pessoa palestrante deletada com sucesso' },
    )
    .catch((err) => res.status(HTTP_BAD_REQUEST).json(err)));
  })
  .catch((err) => res.status(HTTP_BAD_REQUEST).json({ message: `Error ${err}` }));
};

// --------------------------------------------------------

module.exports = {
  getTalkers,
  getTalkerByID,
  getToken,
  postTalker,
  putTalker,
  deleteTalker,
};
