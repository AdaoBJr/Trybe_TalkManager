const findOne = (id, listTalkers) => {
    const talkerFind = listTalkers.find((talker) => talker.id === +id);
    return talkerFind;
  };
  
  const fs = require('fs').promises;
  // const { gerarToken } = require('../helpers');
  
  const validarEmail = (email) => {
    const obrigatorio = { message: 'O campo "email" é obrigatório' };
    const formato = { message: 'O "email" deve ter o formato "email@email.com"' };
    
    if (!email) return obrigatorio; 
    const validEmail = email.includes('@') && email.includes('.com');
    if (!validEmail) return formato;
    return 'ok';
  };
  const validarSenha = (password) => {
    const obrigatorio = { message: 'O campo "password" é obrigatório' };
    const minimo = { message: 'O "password" deve ter pelo menos 6 caracteres' };
    if (!password) return obrigatorio;  
    if (password.length < 6) return minimo;
    return 'ok';
  };
  
  const validaToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    } 
    if (token.length && token.length !== 16) {
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
       .json({ message:
         'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
    }
    if (!talk.watchedAt && talk.watchedAt !== 0) {
      return res
       .status(400)
       .json({ message:
         'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
    }
    next();
  };
  const validaRate = (req, res, next) => {
    const { rate } = req.body.talk;
    if (!rate && rate !== 0) {
      return res
       .status(400)
       .json({ message:
         'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
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
  function readFile() {
    const talkers = fs.readFile('./talker.json', 'utf-8');
    return talkers.then((data) => JSON.parse(data));
  }
  function writeFileTalker(newTalker) {
    return fs.writeFile('./talker.json', JSON.stringify(newTalker));
  }
  const addTalker = async (req, res) => {
    const { name, age, talk } = req.body;
    const talkersList = await readFile();
    const countTalker = talkersList.length;
    const newTalker = {
      id: countTalker + 1,
      name,
      age,
      talk,
    };
    talkersList.push(newTalker);
    await writeFileTalker(talkersList);
    return res.status(201).json(newTalker);
  };
  
  const editTalker = async (req, res) => {
    const { name, age, talk } = req.body;
    let talkersList = await readFile();
    const { id } = req.params;  
    talkersList = talkersList.filter((talker) => talker.id !== +id);
    talkersList.push({ id: +id, name, age, talk });
    await writeFileTalker(talkersList);  
    return res.status(201).json(req.body);
  };
  
  module.exports = {
    findOne,
    validarSenha,
    validarEmail,
    validaToken,
    validaNome,
    validaAge,
    validaDate,
    validaRate, 
    validaTalk,
    addTalker,
    editTalker,
  }; 