const { readFile, createToken, checkDate, writeFile } = require('./functions');

const RES200 = 200;
const RES201 = 201;
const ERR401 = 401;
const ERR404 = 404;
const ERR400 = 400;
const TALKER_NOT_FOUND = 'Pessoa palestrante não encontrada';
const EMAIL_IS_REQ = 'O campo "email" é obrigatório';
const EMAIL_FORMAT = 'O "email" deve ter o formato "email@email.com"';
const PASS_IS_REQ = 'O campo "password" é obrigatório';
const PASS_MIN_LENGTH = 'O "password" deve ter pelo menos 6 caracteres';
const TOKEN_NOT_FOUND = 'Token não encontrado';
const TOKEN_INVALID = 'Token inválido';
const NAME_IS_REQ = 'O campo "name" é obrigatório';
const NAME_MIN_LENGTH = 'O "name" deve ter pelo menos 3 caracteres';
const AGE_IS_REQ = 'O campo "age" é obrigatório';
const AGE_MIN = 'A pessoa palestrante deve ser maior de idade';
const TALK_IS_REQ = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
const WATCHED_AT_FORMAT = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
const RATE_INT = 'O campo "rate" deve ser um inteiro de 1 à 5';
const TALKER_DELETED = 'Pessoa palestrante deletada com sucesso';

const TALKER_JSON = './talker.json';

const getAllTalker = async (req, res) => {
  const result = await readFile(TALKER_JSON);
    if (!result) return res.status(RES200).json([]);
    return res.status(RES200).json(result);
};

const getTalker = async (req, res) => {
  const talkers = await readFile(TALKER_JSON);
  const { id } = req.params;
  const result = talkers.find((talker) => +talker.id === +id);
  if (!result) return res.status(ERR404).json({ message: TALKER_NOT_FOUND });
  res.status(RES200).json(result);
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.status(ERR400).json({ message: EMAIL_IS_REQ });
  if (!email.includes('@') || !email.includes('.com')) {
    return res.status(ERR400).json({ message: EMAIL_FORMAT });
  }
  next();
};

const validatePassword = (req, res, _next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(ERR400).json({ message: PASS_IS_REQ });
  }
  if (password.length < 6) {
    return res.status(ERR400).json({ message: PASS_MIN_LENGTH });
  }
  const newToken = createToken();
  req.token = newToken;
  res.status(RES200).json({ token: newToken });
};

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  // const tokenValue = '7mqaVRXJSp886CGr';
  if (!token) return res.status(ERR401).json({ message: TOKEN_NOT_FOUND });
  if (token.length !== 16) {
    return res.status(ERR401).json({ message: TOKEN_INVALID });
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(ERR400).json({ message: NAME_IS_REQ });
  if (name.length < 3) {
    return res.status(ERR400).json({ message: NAME_MIN_LENGTH });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(ERR400).json({ message: AGE_IS_REQ });
  if (age <= 18) {
    return res.status(ERR400).json({ message: AGE_MIN });
  }
  next();
};

const validateTalk = (req, res, next) => {
 const { talk } = req.body;
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    return res.status(ERR400).json({ message: TALK_IS_REQ });
  }
  next();
};

const validateWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  if (!checkDate(watchedAt)) {
    return res.status(ERR400).json({ message: WATCHED_AT_FORMAT });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (rate < 1 || rate > 5) {
     return res.status(ERR400).json({ message: RATE_INT });
  }
  next();
};

const createTalker = async (req, res, _next) => {
  const { name, age, talk } = req.body;
  const talkers = await readFile(TALKER_JSON);
  const id = talkers.length + 1;
  const obj = { id, name, age, talk };
  const arr = [...talkers, obj];
  await writeFile(TALKER_JSON, arr);
  
  res.status(RES201).json(obj);
};

const editTalker = async (req, res, _next) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await readFile(TALKER_JSON);
  const talkerIndex = talkers.findIndex((talker) => talker.id === +id);
  const talkerEdited = { id: +id, name, age, talk };
 talkers.splice(talkerIndex, 1, talkerEdited);
  await writeFile(TALKER_JSON, talkers);
  res.status(RES200).json(talkerEdited);
};

const deleteTalker = async (req, res, _next) => {
  const { id } = req.params;
  const talkers = await readFile(TALKER_JSON);
  const newTalkers = talkers.filter((talker) => talker.id !== +id);
  await writeFile(TALKER_JSON, newTalkers);
  res.status(RES200).json({ message: TALKER_DELETED });
};

const searchTalker = async (req, res, _next) => {
  const { q } = req.query;
  const talkers = await readFile(TALKER_JSON);
  if (!q) return res.status(RES200).json(talkers);
  const filterTalker = talkers.filter((talker) => talker.name.includes(q));
  if (!filterTalker) return res.status(RES200).json(Array.from([]));
  return res.status(RES200).json(filterTalker);
};

module.exports = { 
  getAllTalker,
  getTalker,
  validateEmail,
  validatePassword,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  createTalker,
  editTalker,
  deleteTalker,
  searchTalker,
 };