const express = require('express');
const fs = require('fs').promises;

const runRead = () => fs.readFile('./talker.json', 'utf-8');
const router = express.Router();

const validToken = (request, response, next) => {
    const token = request.headers.authorization;
    
    if (!token) {
      return response.status(401).json({
        message: 'Token não encontrado',
      });
    }
  
    if (token.length !== 16) {
      return response.status(401).json({
        message: 'Token inválido',
      });
    }
  
    next();
  };
  
  const validName = (request, response, next) => {
    const { name } = request.body;
    
    if (!name) {
      return response.status(400).json({
        message: 'O campo "name" é obrigatório',
      });
    }
  
    if (name.length < 3) {
      return response.status(400).json({
        message: 'O "name" deve ter pelo menos 3 caracteres',
      });
    }
  
    next();
  };
  
  const validAge = (request, response, next) => {
    const { age } = request.body;
    
    if (!age) {
      return response.status(400).json({
        message: 'O campo "age" é obrigatório',
      });
    }
  
    if (typeof age !== 'number' || age < 18) {
      return response.status(400).json({
        message: 'A pessoa palestrante deve ser maior de idade',
      });
    }
  
    next();
  };
  
  const validTalk = (request, response, next) => {
    const { talk } = request.body;
    
    if (!talk) {
      return response.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
    }
  
    if (!(talk.watchedAt && talk.rate) && talk.rate !== 0) {
      return response.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
    }
    
    next();
  };
  
  const validTalkKeys = (request, response, next) => {
    const { talk } = request.body;
    const formartDat = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
    
    if (!formartDat.test(talk.watchedAt)) {
      return response.status(400).json({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      });
    }
    
    if (typeof talk.rate !== 'number' || talk.rate > 5 || talk.rate < 1) {
      return response.status(400).json({
        message: 'O campo "rate" deve ser um inteiro de 1 à 5',
      });
    }
    
    next();
  };
  
  // requisito 7
  
  router.get('/talker/search', validToken,
  async (request, response) => {
    const { q } = request.query;
    const arrayTalker = await runRead();
    const talker = JSON.parse(arrayTalker);
  
    const talkerFiltered = talker.filter((item) => item.name.includes(q));
  
    response.status(200).json(talkerFiltered);
  });
  
  // requisito 5
  
  router.put('/talker/:id', validToken, validName, validAge, validTalk, validTalkKeys,
    
    async (request, response) => {
      const { id } = request.params;
      const { name, age, talk } = request.body;
      const arrayTalker = await runRead();
      const talker = JSON.parse(arrayTalker);
      const talkerIndex = talker.findIndex((item) => item.id === parseInt(id, 10));
      
      talker[talkerIndex] = { ...talker[talkerIndex], name, age, talk };
  
      await fs.writeFile('./talker.json', JSON.stringify(talker));
  
      response.status(200).json(talker[talkerIndex]);
    });
  
  // requisito 6
  
  router.delete('/talker/:id', validToken,
  
  async (request, response) => {
    const arrayTalker = await runRead();
    const talker = JSON.parse(arrayTalker);
    const { id } = request.params;
    const talkerIndex = talker.findIndex((item) => item.id === parseInt(id, 10));
  
    talker.splice(talkerIndex, 1);
  
    await fs.writeFile('./talker.json', JSON.stringify(talker));
  
    return response.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  });
  
  // requisito 2
  
  router.get('/talker/:id', async (request, response) => {
    const arrayTalker = await runRead();
    const talker = JSON.parse(arrayTalker);
    const { id } = request.params;
    const newArray = talker.find((req) => req.id === parseInt(id, 10));
    
    if (!newArray) {
      return response.status(404).json({
        message: 'Pessoa palestrante não encontrada',
      });
    }
    
    return response.status(200).json(newArray);
  });
  
  // requisito 1
  
  router.get('/talker', async (_request, response) => {
    const arrayTalker = await runRead();
    const talker = JSON.parse(arrayTalker);
    if (arrayTalker.length === 0) {
      return response.status(200).json([]);
    }
    return response.status(200).json(talker);
  });
  
  // requisito 4
  
  router.post('/talker', validToken, validName, validAge, validTalk, validTalkKeys,
    
    async (request, response) => {
      const { name, age, talk } = request.body;
      const arrayTalker = await runRead();
      const talker = JSON.parse(arrayTalker);
      const number = talker.length;
  
      const newTalker = {
        id: number + 1,
        name,
        age,
        talk,
      };
  
      talker.push(newTalker);
  
      await fs.writeFile('./talker.json', JSON.stringify(talker));
  
      response.status(201).json(newTalker);
    });

module.exports = router;