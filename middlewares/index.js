const findId = (id, listTalkers) => {
  const talkerFind = listTalkers.find((talker) => talker.id === +id);
  return talkerFind;
};

const fs = require('fs').promises;

const validateEmail = (email) => {
  if (!email) return { message: 'O campo "email" é obrigatório' }; 
  const validEmail = email.includes('@') && email.includes('.com');
  if (!validEmail) return { message: 'O "email" deve ter o formato "email@email.com"' };
  return 'checado';
};

const validateSenha = (password) => {
  if (!password) return { message: 'O campo "password" é obrigatório' };  
  if (password.length < 6) return { message: 'O "password" deve ter pelo menos 6 caracteres' };
  return 'checado';
};

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

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (!talk.watchedAt && talk.watchedAt !== 0) {
    return res
     .status(400)
     .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const validateRate = (req, res, next) => {
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

const validateDate = (req, res, next) => {
  const { talk } = req.body;
  const regexDate = /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/g;
  if (!regexDate.test(talk.watchedAt)) {
    return res
      .status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

function Files() {
  const talkers = fs.readFile('./talker.json', 'utf-8');
  return talkers.then((data) => JSON.parse(data));
}

function writeTalker(addTalker) {
  return fs.writeFile('./talker.json', JSON.stringify(addTalker));
}

const addToTalkers = async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await Files();
  const listTalker = talkers.length;
  const addTalker = {
    id: listTalker + 1,
    name,
    age,
    talk,
  };
  talkers.push(addTalker);
  await writeTalker(talkers);
  return res.status(201).json(addTalker);
};

const putTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  let talkersList = await Files();
  const { id } = req.params;  
  talkersList = talkersList.filter((talker) => talker.id !== +id);
  talkersList.push({ id: +id, name, age, talk });

  await writeTalker(talkersList);  
  return res.status(200).json({ id: +id, name, age, talk });
};

const search = async (req, res) => {
  const { ask } = req.query;
  const talkers = await Files();
  if (!ask || ask === '') {
    return res.status(200).json(talkers);    
  }   
  const filtered = talkers.filter((talker) => talker.name.includes(ask));
  if (filtered.length > 0) {
    return res.status(200).json(filtered); 
  } 
  return res.status(200).json(Array.from([])); 
};

module.exports = {
  findId,
  validateEmail,
  validateSenha,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
  addToTalkers,
  search,
  putTalker,
};
