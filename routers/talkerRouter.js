const express = require('express');

const router = express.Router();

const fs = require('fs').promises;

const arquivo = './talker.json';

router.get('/', (_req, res) => {
  let data = [];
  fs.readFile(arquivo, 'utf8')
  .then((info) => JSON.parse(info))
  .then((info) => {
    data = info;
    return res.status(200).json(data);
  })
.catch((err) => { res.status(400).json(err); });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile(arquivo, 'utf8')
  .then((info) => JSON.parse(info))
  .then((info) => {
    const filtered = info.find((item) => item.id === Number(id));
    if (!filtered) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return res.status(200).json(filtered);
  });
});

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const verifyName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name.length === 0) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
 }
 if (name.length < 3) {
   return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
 }
 next();
};

const verifyAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age.length === 0) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};
const verifyWathedAt = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  const dateRegex = new RegExp(/\d{2}\/\d{2}\/\d{4}/);

  if (!watchedAt) {
    return res.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
    });
}

if (!dateRegex.test(watchedAt)) {
    return res.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
}
next();
};

const verifyRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
   }
  if (!rate) {
    return res.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
    });
}

  next();
};

const verifyTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
      return res.status(400).json({ 
          message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
      });
  }

  return next();
};

router.post('/',
 verifyToken, 
 verifyName, 
 verifyAge, 
 verifyTalk, 
 verifyWathedAt, 
 verifyRate,
 (req, res) => {
  fs.readFile(arquivo, 'utf8')
  .then((info) => JSON.parse(info))
  .then((info) => {
    const data = info;
    const newTalker = {
      ...req.body,
      id: info.length + 1,
    };
    data.push(newTalker);
    fs.writeFile('./talker.json', JSON.stringify(data));
    return res.status(201).json({ ...newTalker });
  })
.catch((err) => res.status(400).json(err));
});

router.put('/:id',
verifyToken,
verifyName,
verifyAge,
verifyTalk,
verifyRate,
verifyWathedAt,
(req, res) => {
  fs.readFile(arquivo, 'utf8')
  .then((info) => JSON.parse(info))
  .then((info) => {
    const { id } = req.params;
    const dataFiltered = info.filter((talker) => talker.id !== Number(id)); // retira o id que foi editado
    const editedTalker = {
      ...req.body,
      id: Number(id),
    };
    dataFiltered.push(editedTalker); // coloca o talker editado dentro
    const data = dataFiltered; // apenas para denotar que um novo data completo foi criado
    fs.writeFile('./talker.json', JSON.stringify(data));
    return res.status(200).json(editedTalker);
  })
.catch((err) => res.status(400).json(err));
});

router.delete('/:id',
verifyToken,
 (req, res) => {
  fs.readFile(arquivo, 'utf8')
  .then((info) => JSON.parse(info))
  .then((info) => {
    const { id } = req.params;
    const dataFiltered = info.filter((talker) => talker.id !== Number(id));
    const data = dataFiltered;
    fs.writeFile('./talker.json', JSON.stringify(data));
    return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  })
  .catch((err) => res.status(400).json(err));
 });
 
module.exports = router;
