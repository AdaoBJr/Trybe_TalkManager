const express = require('express');
const { 
  getTalkers,
  saveTalker,
} = require('../midlewears/talkers');
const {
  validateAge,
  validateDate,
  validateName,
  validateRate,
  validateTalk,
  validateToken,
} = require('../midlewears/validates');

const talkerRoute = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_ERROR_NOT_FOUND = 404;

talkerRoute.get('/', async (_req, res) => {
  const talkers = await getTalkers();
  return res.status(HTTP_OK_STATUS).send(talkers);
}); // Pegando Palestrante

talkerRoute.get('/:id', async (req, res) => {
  const talkers = await getTalkers();
  const filterID = talkers.find((talk) => talk.id === Number(req.params.id));

  const result = !filterID
    ? res.status(HTTP_ERROR_NOT_FOUND).send({ message: 'Pessoa palestrante não encontrada' })
    : res.status(HTTP_OK_STATUS).send(filterID);

  return result;
}); // Filtrando por Id de Palestrante

talkerRoute.post('/', 
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
  async (req, res) => {
    const talkers = await getTalkers();

    talkers.push(req.body);
    saveTalker(talkers);
    
    const result = {
      id: talkers.id,
      name: talkers.name,
      age: talkers.age,
      talk: talkers.talk,
    };

    return res.status(HTTP_CREATED_STATUS).json(result);
  }); // Adicionando Palestrantes

talkerRoute.put('/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
  async (req, res) => {
  const talkers = await getTalkers();
  const { name, age, talk } = req.body;
  const { id } = req.params;
  saveTalker(talkers.map((talker) => {
    if (talker.id === Number(id)) {
      return { ...talker, ...req.body };
    }
    return talker;
  }));

  return res.status(HTTP_OK_STATUS).json({
    id,
    name,
    age,
    talk: { ...talk },
  });
}); // Atualizando Palestrante

talkerRoute.delete('/:id', validateToken, async (req, res) => {
  const talkers = await getTalkers();
  const { id } = req.params;
  saveTalker(talkers.filter((talker) => talker.id !== Number(id)));

  return res.status(HTTP_OK_STATUS).send({ message: 'Pessoa palestrante deletada com sucesso' });
}); // Deletando Palestrante

module.exports = talkerRoute;
