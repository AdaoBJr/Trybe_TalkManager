const fs = require('fs').promises;

function getAllTalkers() {
  return fs.readFile('./talker.json', 'utf-8')
    .then((fileContent) => JSON.parse(fileContent));
}

function tokenGenerate(length, req, res) {
  const { token } = req.headers.autorization;
  res.status(200).json({ token });
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const verifyemail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!email.includes('@') || !email.includes('.com')) {
  return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const verifyPassword = (req, res, next) => {
const { password } = req.body;
/* const passwordRegex = /^[0-9]*$/; */
if (!password) {
  return res.status(400).json({ message: 'O campo "password" é obrigatório' });
}
if (password <= 6) {
  return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = { getAllTalkers, verifyPassword, verifyemail, tokenGenerate };
