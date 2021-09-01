const regexEmail = /\S+@\S+\.\S+/;
const regexData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
const fs = require('fs').promises;
let talkers = require('../talker.json');

const authUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!regexEmail.test(email)) {
    return res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return next();
};

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  
  return next();
};

const validateNameAndAgeTalker = (req, res, next) => {
  const { name, age } = req.body;
  
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 4) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (Number(age < 18)) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  return next();
};

const validateDateAndRateTalker = (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;

  if (!regexData.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  return next();
};

const validateTalkTalker = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt) {
    return res
    .status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (!talk.rate && talk.rate !== 0) {
    return res
    .status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  return next();
  };

  const writeFile = async (talker) => {
    try {
      await fs.writeFile('talker.json', JSON.stringify(talker));
    } catch (err) {
    console.log(`ocorreu um erro: ${err}`);  
    }
  };

  const addTalker = async (req, res) => {
    const { name, age, talk } = req.body;
    // const qtyTalkers = talkers.length;
    const newTalker = { id: 5, name, age, talk };
    talkers.push(newTalker);
    // await fs.writeFile('./talker.json', JSON.stringify(talkers));
    await writeFile(talkers);
    return res.status(201).json(newTalker);
  };

  const editTalker = async (req, res) => {
    const { name, age, talk } = req.body;
    const { id } = req.params;  
    talkers = talkers.filter((t) => t.id === Number(id));
    talkers.push({ id: Number(id), name, age, talk });
    // await fs.writeFile('talker.json', JSON.stringify(talkers));
    await writeFile(talkers);
    return res.status(200).json({ id: Number(id), name, age, talk });
  };

module.exports = { 
  authUser,
  validateToken,
  validateNameAndAgeTalker,
  validateDateAndRateTalker,
  validateTalkTalker,
  addTalker,
  editTalker,
};