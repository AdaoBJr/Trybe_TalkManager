function validateEmail(req, res, next) {
  const { email } = req.body;
  const reg = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!reg.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
}

function validatePassword(req, res, next) {
  const { password } = req.body;

  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
}

function validateName(req, res, next) {
  const { name } = req.body;

  if (!name || name === '') {
    return res.send(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 2) {
    return res.send(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
}

function validateAge(req, res, next) {
  const { age } = req.body;

  if (!age || age === '') {
    return res.send(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res.send(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
}

function validateDate(req, res, next) {
  const { talk } = req.body;
  const reg = new RegExp(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (!reg.test(talk.watchedAt)) {
    return res.send(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
}

function validateRate(req, res, next) {
  const { talk } = req.body;

  if (talk.rate < 1 || talk.rate > 5) {
    return res.send(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
}

function validateDateAndRate(req, res, next) {
  const { talk } = req.body;

  if (!talk || talk === {} || !talk.watchedAt || !talk.rate) {
    return res.send(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
}

module.exports = {
  validateEmail,
  validatePassword,
  validateName,
  validateAge,
  validateDate,
  validateRate,
  validateDateAndRate,
};