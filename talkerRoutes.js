const express = require('express');
const { readTalkerFile, validateToken,
  validateName, validateAge, validateTalk, writeTalkerFile } = require('./utils');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NOT_FOUND_STATUS = 404;
const router = express.Router();

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const talkers = readTalkerFile();

  const talkerFound = talkers.find((talker) => `${talker.id}` === id);

  if (!talkerFound) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(HTTP_OK_STATUS).json(talkerFound);
});

router.put(
  '/:id', 
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  (req, res) => {
    const { name, age, talk } = req.body;
    const { id } = req.params;
    const talkers = readTalkerFile();

    const talkerFoundIndex = talkers.findIndex((talker) => talker.id === Number(id));
    talkers.splice(talkerFoundIndex, 1, { ...talkers[talkerFoundIndex], name, age, talk });

    writeTalkerFile(JSON.stringify([...talkers]));
    res.status(HTTP_OK_STATUS).json(talkers[talkerFoundIndex]);
  },
);

router.delete('/:id', validateToken, (req, res) => {
  const { id } = req.params;
  const talkers = readTalkerFile();

  const newTalkers = talkers.filter((talker) => talker.id !== Number(id));
  writeTalkerFile(JSON.stringify(newTalkers));
  res.status(HTTP_OK_STATUS).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

router.get('/', (req, res) => {
  const talkers = readTalkerFile();
  return res.status(HTTP_OK_STATUS).json(talkers);
});

router.post(
  '/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = readTalkerFile();

    const lastElementIndex = talkers.length - 1;
    const id = talkers[lastElementIndex].id + 1;

    const newTalker = { id, name, age, talk };
    const newTalkers = [...talkers, newTalker];

    writeTalkerFile(JSON.stringify(newTalkers));

    return res.status(HTTP_CREATED_STATUS).json(newTalker);
  },
);

module.exports = router;
