const fs = require('fs');
const express = require('express');
const { join } = require('path');

const talkerRoute = express.Router();
const filePath = join('talker.json');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_ERROR_NOT_FOUND = 404;

const getTalkers = () => {
  const data = fs.existsSync(filePath)
    ? fs.readFileSync(filePath)
    : [];
  try {
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

talkerRoute.get('/', (_req, res) => {
  const talkers = getTalkers();
  return res.status(HTTP_OK_STATUS).send(talkers);
}); // Pegando usuários

talkerRoute.get('/:id', (req, res) => {
  const talkers = getTalkers();
  const filterID = talkers.find((talk) => talk.id === Number(req.params.id));

  const result = !filterID
    ? res.status(HTTP_ERROR_NOT_FOUND).send({ message: 'Pessoa palestrante não encontrada' })
    : res.status(HTTP_OK_STATUS).send(filterID);

  return result;
}); // Filtrando por Id de usuário

const saveTalker = (talkers) => {
  fs.writeFileSync(filePath, JSON.stringify(talkers, null, '\t'));
};

talkerRoute.post('/', (req, res) => {
  const talkers = getTalkers();
  talkers.push(req.body);
  saveTalker(talkers);

  return res.status(HTTP_CREATED_STATUS).send(talkers);
}); // Adicionando usuários

module.exports = talkerRoute;
