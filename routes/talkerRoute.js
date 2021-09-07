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
    const { name, age, talk } = req.body;
    const newTalker = { id: talkers.length + 1, name, age, talk };
    talkers.push(newTalker);
    saveTalker(talkers);

    return res.status(HTTP_CREATED_STATUS).json(newTalker);
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
    const { id } = req.params;
    saveTalker(talkers.map((talker) => {
      if (talker.id === Number(id)) {
        return { ...talker, ...req.body };
      }
      return talker;
    }));

    const result = {
      ...req.body,
    };

    return res.status(HTTP_OK_STATUS).json(result);
  }); // Atualizando Palestrante

talkerRoute.delete('/:id', validateToken, async (req, res) => {
  const talkers = await getTalkers();
  const { id } = req.params;
  saveTalker(talkers.filter((talker) => talker.id !== Number(id)));

  return res.status(HTTP_OK_STATUS).send({ message: 'Pessoa palestrante deletada com sucesso' });
}); // Deletando Palestrante

module.exports = talkerRoute;
