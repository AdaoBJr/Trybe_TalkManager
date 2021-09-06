const fs = require('fs');
const express = require('express');
const { join } = require('path');

const talkerRoute = express.Router();
const filePath = join('talker.json');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_BAD_REQUEST = 400;
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

const saveTalker = (talkers) => {
  fs.writeFileSync(filePath, JSON.stringify(talkers, null, '\t'));
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  const DEFAULT_AGE = 18;

  if (!age) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < DEFAULT_AGE) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ mesage: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validateDate = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const dateRegex = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/g;

  if (!dateRegex.test(watchedAt)) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  const DEFAULT_LENGTH = 3;

  if (!name) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < DEFAULT_LENGTH) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O campo "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateRate = (req, res, next) => {
  const { rate } = req.body.talk;

  if (!Number.isInteger(rate) && rate >= 1 && rate <= 5) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 a 5' });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk, rate, talk: { watchedAt } } = req.body;

  if (!talk || typeof rate !== 'number' || !watchedAt) {
    return res.status(HTTP_BAD_REQUEST)
      .json({
        message: `O campo "talk"
      é obrigatório e "watchedAt" e "rate" não podem ser vazios` });
  }
  next();
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  const DEFAULT_LENGTH = 16;

  if (!authorization) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'Token não encontrado' });
  }

  if (authorization.length < DEFAULT_LENGTH) {
    return res.status(HTTP_BAD_REQUEST)
      .json({ message: 'Token inválido' });
  }

  next();
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

talkerRoute.post('/',
  validateAge,
  validateDate,
  validateName,
  validateRate,
  validateTalk,
  validateToken,
  (req, res) => {
    const talkers = getTalkers();
    talkers.push(req.body);
    saveTalker(talkers);

    return res.status(HTTP_CREATED_STATUS).json(talkers);
  }); // Adicionando usuários

talkerRoute.put('/:id', (req, res) => {
  const talkers = getTalkers();
  saveTalker(talkers.map((talker) => {
    if (talker.id === req.params.id) {
      return { ...talker, ...req.body };
    }
    return talker;
  }));

  return res.status(HTTP_CREATED_STATUS).send(talkers);
}); // Atualizando usuários

module.exports = talkerRoute;
