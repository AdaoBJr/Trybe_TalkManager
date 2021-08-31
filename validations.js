const validationEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  if (!(/\w+@\w+\.\w{2,4}/g).test(email)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
};

const validatePassWord = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
};

const validationToken = (req, res, next) => {
const { authorization } = req.headers;
if (!authorization) {
  return res.status(401).json({
    message: 'Token não encontrado',
  });
}
if (authorization.length !== 16) {
  return res.status(401).json({
    message: 'Token inválido',
  });
}
next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
 if (!name) {
  return res.status(400).json({
    message: 'O campo "name" é obrigatório',
  });
 }
if (name.length < 3) {
  return res.status(400).json({
    message: 'O "name" deve ter pelo menos 3 caracteres',
  });
}
next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || Number(age) <= 0) {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
   }
  if (Number(age) < 18) {
    return res.status(400).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }
  next();
};
const validateTalk = (req, res, next) => {
  const { watchedAt, rate } = req.body.talk;
  if (!(/^\d{2}\/\d{2}\/\d{4}$/).test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  if (Number(rate) < 1 || Number(rate) > 5) {
    return res.status(400).json(
      { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
    );
  }
  next();
};

const validateTalk2 = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || talk.rate === undefined) {
    return res.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
    }
    next();
};

module.exports = {
  validatePassWord,
  validationEmail,
  validationToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalk2,
};

const watchedAt = '22/01/0000';
console.log((/^\d{2}\/\d{2}\/\d{4}$/).test(watchedAt));