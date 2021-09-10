const fs = require('fs').promises;
const fsinc = require('fs');
const dataRegex = require('../functions/dataRegex');

const file = 'talker.json';
const OK_STATUS = 200;
const GOOD_REQ = 201;
const BAD_REQ = 400;
const INVALID = 401;
const NOT_FOUND = 404;

const getTalkers = async () => {
  const data = await fs.readFile(file, 'utf-8');
  const talkers = await JSON.parse(data);

  return talkers;
};

const getTalkersById = async (req, res) => {
  const talkers = await getTalkers();
  const { id } = await req.params;

  const talker = talkers.find((curr) => curr.id === Number(id));

  if (!talker) {
    return res.status(NOT_FOUND).json(
      { message: 'Pessoa palestrante não encontrada' },
    );
  }

  return res.status(OK_STATUS).json(talker);
};

const getAllTalkers = async (_req, res) => {
  const talkers = await getTalkers();

  if (!talkers) {
    return res.status(OK_STATUS).send([]);
  }

  return res.status(OK_STATUS).json(talkers);
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || token === '') {
    return res.status(INVALID).json({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    return res.status(INVALID).json({ message: 'Token inválido' });
  }

  next();
};

const verifyName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(BAD_REQ).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length <= 2) {
    return res.status(BAD_REQ).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const verifyAge = (req, res, next) => {
  const { age } = req.body;
  const minAge = 18;

  if (!age || age === '') {
    return res.status(BAD_REQ).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < minAge) {
    return res.status(BAD_REQ).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const verifyTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || talk === '') {
    return res.status(BAD_REQ).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};

const verifyWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const data = dataRegex(talk.watchedAt);

  if (!talk.watchedAt || talk.watchedAt === '') {
    return res.status(BAD_REQ).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  if (data !== true) {
    return res.status(BAD_REQ).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  next();
};

const verifyRate = (req, res, next) => {
  const { talk } = req.body;

  if (!talk.rate || talk.rate === '') {
    return res.status(BAD_REQ).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(BAD_REQ).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

const writeFile = (url, string) => {
  fsinc.writeFileSync(url, string, 'utf8');
};

const newTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = fsinc.readFileSync(file, 'utf8');

  const talkersToJson = await JSON.parse(talkers);
  const id = await talkersToJson.length + 1;
  const reqBody = [...talkersToJson, { id, name, age, talk }];
  const string = await JSON.stringify(reqBody);

  await writeFile(file, string);

  return res.status(GOOD_REQ).send({ id: Number(id), name, age, talk });
};

const editTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const talkers = fsinc.readFileSync(file, 'utf8');
  const data = await JSON.parse(talkers);

  const index = data.findIndex((talker) => talker.id === Number(id));
  data[index] = { id: Number(id), name, age, talk };
  const string = JSON.stringify(data);
  writeFile(file, string);

  return res.status(OK_STATUS).json({ id: Number(id), name, age, talk });
};

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const talkers = fsinc.readFileSync(file, 'utf8');
  const data = await JSON.parse(talkers);

  const talkerIdFilter = data.filter((talker) => talker.id !== Number(id));
  const deleted = JSON.stringify(talkerIdFilter);
  writeFile(file, deleted);

  return res.status(OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

const readFile = (fileName) => fs.readFile(fileName, 'utf-8')
  .then((res) => JSON.parse(res))
  .catch((err) => JSON.parse(err));

const searchTalker = async (req, res) => {
  const { query } = req.query;
  const talkList = await readFile(file);
  const filterTalk = talkList.filter((curr) => curr.name.includes(query));

  if (!query || query === '') {
    return res.status(OK_STATUS).json(talkList);
  }

  if (!filterTalk || filterTalk === '') {
    return res.status(OK_STATUS).send([]);
  }

  return res.status(OK_STATUS).json(filterTalk);
};

module.exports = {
  getTalkersById,
  getAllTalkers,
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyWatchedAt,
  verifyRate,
  newTalker,
  editTalker,
  deleteTalker,
  searchTalker,
};
