const fs = require('fs').promises;

const talkers = './talker.json';

const readTalker = async () => {
    const data = await fs.readFile(talkers, 'utf8');
    return JSON.parse(data);
};

const writeTalker = async (params) => {
  const data = await fs.writeFile(talkers, JSON.stringify(params));
  return data;
};

const getTalkerById = (id, listTalkers) => {
  const talkerFind = listTalkers.find((talker) => talker.id === +id);
  return talkerFind;
};

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || talk === '') {
    return res.status(400)
      .json({ 
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  next();
};

const validateDate = (req, res, next) => {
  const { watchedAt } = req.body.talk;

  if (!watchedAt) {
    return res.status(400)
      .json({ 
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  // ref: https://www.codegrepper.com/code-examples/javascript/how+to+check+date+format+in+javascript
  const dateRegex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  if (!(dateRegex.test(watchedAt))) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { rate } = req.body.talk;

  if (rate === undefined || rate === '') {
    return res.status(400)
      .json({ 
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }

  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const validateToken = (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (token.length && token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const addTalker = async (req, res, _next) => {
  const { name, age, talk } = req.body;
  const talkerList = await readTalker();
  const countTalker = talkerList.length;
  const newTalker = {
    id: countTalker + 1,
    name,
    age,
    talk,
  };

  talkerList.push(newTalker);

  await writeTalker(talkerList); // salva nova lista

  return res.status(201).json(newTalker);
};

// const findTalkerById = (id, talkerList) => {
//   const talkerFound = talkerList.find((talker) => talker.id === +id);

//   return talkerFound;
// };

// const editTalker = async (req, res) => {
//   const { name, age, talk } = req.body;
  
//   let talkerList = await readTalker();
//   const { id } = req.params;
//   talkerList = talkerList.filter((talker) => talker.id !== +id);
  
//   talkerList.push({ id: +id, name, age, talk });

//   await writeTalker(talkerList); 
//   return res.status(200).json({ id: +id, name, age, talk });
// };

const editTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  let talkerList = await readTalker();
  const { id } = req.params;
  talkerList = talkerList.filter((talker) => talker.id !== +id);
  talkerList.push({ id: +id, name, age, talk });

  await writeTalker(talkerList);  
  return res.status(200).json({ id: +id, name, age, talk });
};

const deleteTalker = async (req, res) => {
  const { id } = req.params;

  let talkerList = await readTalker();  
  talkerList = talkerList.filter((talker) => talker.id !== Number(id));

  talkerList = talkerList.filter((talker) => talker.id !== Number(id));

  await writeTalker(talkerList);
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = {
  readTalker,
  getTalkerById,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
  validateToken,
  addTalker,
  editTalker,
  deleteTalker,
};
