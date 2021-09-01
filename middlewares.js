const fs = require('fs').promises;
const crypto = require('crypto');

const talker = './talker.json';

const readFileTalker = async () => {
  const talkerList = await fs.readFile(talker, 'utf-8');
  return JSON.parse(talkerList);
};

const getTalkerById = async (id) => {
  const talkerList = await readFileTalker();
  return talkerList.find((obj) => obj.id === Number(id));
};

const generateRandomToken = () => crypto.randomBytes(8).toString('hex');

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  } 
  if (token.length && token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  } 
  next();
};

function setValidateEmail(email) {
 const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  if (regex.test(email)) {
    return true; 
  }

 return false;
} 

const checkIfEmailIsValid = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (setValidateEmail(email) === false) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(age) < 18) {
    return res
      .status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const checkIfPasswordIsValid = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.toString().length < 5) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const validateTalker = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (!talk.watchedAt && talk.watchedAt !== 0) {
    return res.status(400)
     .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { rate } = req.body.talk;
  if (!rate && rate !== 0) {
    return res.status(400)
     .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const validateDate = (req, res, next) => {
  const { talk } = req.body;
  const regex = /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/g;
  if (!regex.test(talk.watchedAt)) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

function addTalkerToFileTalker(newTalkerToList) {
  return fs.writeFile('./talker.json', JSON.stringify(newTalkerToList));
}

const addTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const getTalkersList = await readFileTalker();
  const countNumberOfTalkers = getTalkersList.length;
  const newTalker = {
    id: countNumberOfTalkers + 1,
    name,
    age,
    talk,
  };
  getTalkersList.push(newTalker);
  await addTalkerToFileTalker(getTalkersList);
  return res.status(201).json(newTalker);
};

const updatePalestrantesList = (content) => fs.writeFile('./talker.json', JSON.stringify(content));

module.exports = {
  readFileTalker,
  getTalkerById,
  generateRandomToken,
  checkIfEmailIsValid,
  checkIfPasswordIsValid,
  validateAge,
  validateDate,
  validateName,
  validateRate,
  validateTalker,
  validateToken,
  addTalker,
  updatePalestrantesList,
};
