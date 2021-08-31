const fs = require('fs').promises;

function tokenValidation(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
}

function nameValidation(req, res, next) {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
}

function ageValidation(req, res, next) {
  const { age } = req.body;
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
}

function talkValidation(req, res, next) {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
}

function watchedAtValidation(req, res, next) {
  const { watchedAt } = req.body.talk;
  const dateValidation = new RegExp(/^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/);
  if (!dateValidation.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
}

function rateValidation(req, res, next) {
  const { rate } = req.body.talk;
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
}

async function editTalker(req, res) {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const talkers = JSON.parse(await fs.readFile('talker.json', 'utf8'));
  const editedTalker = {
    name,
    age,
    id: Number(id),
    talk: { ...talk },
  };
  const getTalkers = talkers.filter((talker) => talker.id !== id);
  getTalkers.push(editedTalker);
  await fs.writeFile('talker.json', JSON.stringify(getTalkers));
  return res.status(200).json(editedTalker);
}

module.exports = {
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  editTalker,
};