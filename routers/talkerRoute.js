const express = require('express');
const fs = require('fs').promises;

const router = express.Router();
const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_BADREQUEST_STATUS = 400;
const HTTP_UNAUTHORIZED_STATUS = 401;
const HTTP_NOTFOUND_STATUS = 404;

const getTalkerList = async () => {
  const list = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(list);
};

const tokenValidator = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).send({ message: 'Token não encontrado' });
  } if (authorization.length !== 16) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).send({ message: 'Token inválido' });
  }
  next();
};

const nameValidator = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(HTTP_BADREQUEST_STATUS).send({ message: 'O campo "name" é obrigatório' });
  } if (name.length < 3) {
    return res.status(HTTP_BADREQUEST_STATUS)
      .send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const ageValidator = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(HTTP_BADREQUEST_STATUS).send({ message: 'O campo "age" é obrigatório' });
  } if (age < 18) {
    return res.status(HTTP_BADREQUEST_STATUS)
      .send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const talkValidator = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || talk.rate === undefined) {
    return res.status(HTTP_BADREQUEST_STATUS)
      .send(
        { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
  }
  next();
};

const talkKeysValidator = (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;
  const regexDate = new RegExp(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i);
  if (!regexDate.test(watchedAt)) {
    return res.status(HTTP_BADREQUEST_STATUS)
      .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  } if (rate < 1 || rate > 5) {
    return res.status(HTTP_BADREQUEST_STATUS)
      .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const updateTalkersList = async (newTalker) => {
  try {
    await fs.writeFile('./talker.json', JSON.stringify(newTalker));
    console.log('Talker has been successfully added');
  } catch (error) {
    console.error(`Error adding talker: ${error.message}`);
  }
};

router.get('/', async (_req, res) => {
  const talkersList = await getTalkerList();
  res.status(HTTP_OK_STATUS).json(talkersList);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkersList = await getTalkerList();
  const talker = talkersList.find((t) => t.id === parseInt(id, 10));
  if (!talker) {
    return res.status(HTTP_NOTFOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(HTTP_OK_STATUS).json(talker);
});

router.post(
  '/',
  tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator,
  talkKeysValidator,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const talkersList = await getTalkerList();
    const addThisTalker = { name, age, id: talkersList.length + 1, talk };
    const listUpdated = [...talkersList, addThisTalker];
    await updateTalkersList(listUpdated);
    res.status(HTTP_CREATED_STATUS).json(addThisTalker);
  },
);

router.put(
  '/:id',
  tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator,
  talkKeysValidator,
  async (req, res) => {
    const { id } = req.params;
    const talkersList = await getTalkerList();
    const talkerIndex = talkersList.findIndex((t) => t.id === Number(id));
    talkersList[talkerIndex] = { ...req.body, id: Number(id) };
    await updateTalkersList(talkersList);
    res.status(HTTP_OK_STATUS).json(talkersList[talkerIndex]);
  },
);

router.delete(
  '/:id',
  tokenValidator,
  async (req, res) => {
    const { id } = req.params;
    const talkersList = await getTalkerList();
    const talkerRemoved = talkersList.filter((t) => t.id !== Number(id));
    await updateTalkersList(talkerRemoved);
    res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
  },
);

module.exports = router;
