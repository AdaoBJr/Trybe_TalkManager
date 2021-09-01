const fs = require('fs').promises;

const readFile = async (_req, res) => {
  const content = await fs.readFile('./talker.json', 'utf-8');
  if (content.length === 0) {
    return res.status(200).json([]);
  }
  const contentInJSON = JSON.parse(content);
  return res.status(200).json(contentInJSON);
};

const readFileId = async (req, res) => {
  const { id } = req.params;
  const content = await fs.readFile('./talker.json', 'utf-8');
  const contentInJSON = JSON.parse(content);
  const foundTalker = contentInJSON.find((eachTalker) => eachTalker.id === Number(id));
  if (!foundTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(foundTalker);
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' }); 
  }

  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
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
  req.name = name;
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(age) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  req.age = Number(age);
  next();
};

const validateGeneralTalk = (req, res, next) => {
  const { talk } = req.body;
  if (talk === undefined) {
    return res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
    }
  const { rate } = talk; 
  const { watchedAt } = talk;
  if (!rate || !watchedAt) {
    return res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
    }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body; const { watchedAt } = talk; const { rate } = talk;
  const regexDate = /^(\d{2})([/]?)(\d{2})\2(\d{4})$/;
  const rateNumber = Number(rate);
  if (!(regexDate.test(watchedAt))) { 
      return res.status(400).json({
       message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
  }
  if (rateNumber < 1 || rateNumber > 5 || !Number.isInteger(rateNumber)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
}
  req.allItems = { talk, watchedAt, rate };
  next();
};

const readAndWrite = async (req, res) => {
  const content = await fs.readFile('./talker.json', 'utf-8');
  const contentInJSON = JSON.parse(content);
  const num = contentInJSON[contentInJSON.length - 1].id + 1;
  const { watchedAt, rate } = req.allItems;
  contentInJSON.push({ id: num,
    name: req.name,
    age: req.age,
    talk: { watchedAt, rate },
  });
  const contentInString = JSON.stringify(contentInJSON);
  await fs.writeFile('./talker.json', contentInString);
  return res.status(201).json({ id: num,
    name: req.name,
    age: req.age,
    talk: { watchedAt, rate },
  });
};

module.exports = {
 readFile,
 readFileId,
 validateToken,
 validateName,
 validateAge,
 validateTalk,
 validateGeneralTalk,
 readAndWrite,
};
