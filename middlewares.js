const fs = require('fs').promises;
const crypto = require('crypto');

const readTalkerJson = () => fs.readFile('./talker.json', 'utf-8')
  .then((fileContent) => JSON.parse(fileContent));

const generateToken = () => crypto.randomBytes(8).toString('hex');

// https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
function validateEmail(email) {
 const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
 if (reg.test(email)) {
 return true; 
}
 
 return false;
} 

const isValidEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (validateEmail(email) === false) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const isValidPassword = (req, res, next) => {
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
  readTalkerJson,
  generateToken,
  isValidEmail,
  isValidPassword,
};
