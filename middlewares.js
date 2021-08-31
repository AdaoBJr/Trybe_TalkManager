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

function setValidateEmail(email) {
 const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  if (reg.test(email)) {
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

module.exports = {
  readFileTalker,
  getTalkerById,
  generateRandomToken,
  checkIfEmailIsValid,
  checkIfPasswordIsValid,
};
