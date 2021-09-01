const fs = require('fs').promises;

const getTalkers = async () => {
  const readTalkers = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(readTalkers);
};

const getTalkerById = async (id) => {
  const talkers = await getTalkers();
  const talker = talkers.find((r) => r.id === parseInt(id, 10));

  return talker;
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const re = /\S+@\S+\.\S+/;
  const isEmailValid = re.test(email);

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!isEmailValid) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  
  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = {
  getTalkers,
  getTalkerById,
  validateEmail,
  validatePassword,
};
