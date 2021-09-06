const express = require('express');
const fs = require('fs').promises;

const runRead = () => fs.readFile('./talker.json', 'utf-8');
const router = express.Router();

const { validAge, validName, validTalk, validTalkKeys, validToken } = require('../middlewares');
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