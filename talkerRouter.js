const { Router } = require('express');

const router = Router();
const fs = require('fs').promises;

const talkerJSON = 'talker.json';

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }

  if (authorization.length <= 15) {
    return res.status(401).send({ message: 'Token inválido' });
  }

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length <= 2) {
    return res
      .status(400)
      .send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  }
  if (age <= 17) {
    return res
      .status(400)
      .send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    return res.status(400).send({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};

const validateDate = (req, res, next) => {
  const { talk } = req.body;
  const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (regex.test(talk.watchedAt) === false) {
    return res
      .status(400)
      .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validateRate = (req, res, next) => {
  const { talk } = req.body;

  if (talk.rate < 1 || talk.rate > 5) {
    return res
      .status(400)
      .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

router.get('/', (_req, res) => {
  fs.readFile(talkerJSON, 'utf-8').then((response) =>
    res.status(200).send(JSON.parse(response)));
});

router.get('/search', validateToken, async (req, res) => {
  const { searchTerm } = req.query;

  const content = await fs.readFile(talkerJSON, 'utf-8');
  const parsedContent = JSON.parse(content);

  if (!searchTerm) return res.status(200).send(parsedContent);

  const filteredContent = parsedContent.filter((currentValue) =>
    currentValue.name.includes(searchTerm));

  res.status(200).send(filteredContent);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const content = await fs.readFile(talkerJSON, 'utf-8');
  const contentJSON = JSON.parse(content);
  const filteredContent = contentJSON.find(
    (currentValue) => currentValue.id === +id,
  );

  if (!filteredContent) {
    return res
      .status(404)
      .send({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).send(filteredContent);
});

router.post(
  '/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
  async (req, res) => {
    const { name, age, talk } = req.body;

    const content = await fs.readFile(talkerJSON, 'utf-8');

    const parsedContent = JSON.parse(content);

    const id = parsedContent.length + 1;
    const data = { id, name, age, talk };

    parsedContent.push(data);

    await fs.writeFile('./talker.json', JSON.stringify(parsedContent));

    return res.status(201).send(data);
  },
);

router.put(
  '/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateDate,
  validateRate,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;

    const data = { name, age, id: parseInt(id, 0), talk };

    const content = await fs.readFile(talkerJSON, 'utf-8');

    const parsedContent = JSON.parse(content);

    const newContent = parsedContent.map((currentValue) => {
      if (currentValue.id === +id) return data;
      return currentValue;
    });

    await fs.writeFile('./talker.json', JSON.stringify(newContent));

    res.status(200).send(data);
  },
);

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const indexID = id - 1;

  const content = await fs.readFile(talkerJSON, 'utf-8');

  const parsedContent = JSON.parse(content);

  parsedContent.splice(indexID, 1);

  await fs.writeFile('./talker.json', JSON.stringify(parsedContent));

  res.status(200).send({ message: 'Pessoa palestrante deletada com sucesso' });
});
module.exports = router;
