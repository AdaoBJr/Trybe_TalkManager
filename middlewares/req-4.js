const fs = require('fs').promises;

const validaToken = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  } 
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  } 
  next();
};

const validaNome = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validaAge = (req, res, next) => {
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

const validaTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res
     .status(400)
     .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (!talk.watchedAt && talk.watchedAt !== 0) {
    return res
     .status(400)
     .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const validaRate = (req, res, next) => {
  const { rate } = req.body.talk;
  if (!rate && rate !== 0) {
    return res
     .status(400)
     .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const validaDate = (req, res, next) => {
  const { talk } = req.body;
  const regexDate = /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/g;
  if (!regexDate.test(talk.watchedAt)) {
    return res
      .status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const addTalker = async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const response = await fs.readFile('./talker.json', 'utf-8');
  const convert = JSON.parse(response);
  const newPalester = {
    id: convert.length + 1,
    name,
    age,
    talk: { watchedAt, rate } };
  convert.push(newPalester);
  await fs.writeFile('./talker.json', JSON.stringify(convert));
  return res.status(201).json(newPalester);
};

const editTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;  
  
  const response = await fs.readFile('./talker.json', 'utf-8');
  let convert = JSON.parse(response);
  convert = convert.filter((talker) => talker.id !== +id);

  convert.push({ id: +id, name, age, talk });

  await fs.writeFile('./talker.json', JSON.stringify(convert));
  return res.status(200).json({ id: +id, name, age, talk });
};

module.exports = {
  validaToken,
  validaNome,
  validaAge,
  validaTalk,
  validaRate,
  validaDate,
  addTalker,
  editTalker,
};
