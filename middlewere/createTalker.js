const fs = require('fs').promises;

const arquivo = './talker.json';

const validateName = (req, res, next) => {
  const { name } = req.body;
    
  if (!name) {
    return res.status(400)
    .json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400)
    .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
    
  if (!age) {
    return res.status(400)
    .json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400)
    .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  
  next();
};

const validateDate = (req, res, next) => {
  const { talk } = req.body;
  const regex = /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/g;

  if (!regex.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validateRate = (req, res, next) => {
  const { talk } = req.body;
  
  const number = Number(talk.rate);
  // Função Number.isInteger(): https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
  const numberInt = Number.isInteger(number);

  if ((number < 1 || number > 5) || !numberInt) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  
  if (!talk || !talk.rate || !talk.watchedAt) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next();
};

const createTalker = async (req, res, _next) => {
  const { name, age, talk } = req.body;
  
  const talkers = await fs.readFile(arquivo, 'utf8')
  .then((data) => JSON.parse(data));

  const newTalker = { id: talkers.length + 1, name, age, talk };
  talkers.push(newTalker);

  await fs.writeFile(arquivo, JSON.stringify(talkers));
  
  return res.status(201).json(newTalker);
};

module.exports = { 
  validateName, 
  validateAge, 
  validateDate, 
  validateRate, 
  validateTalk, 
  createTalker,
};
