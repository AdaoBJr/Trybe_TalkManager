const crypto = require('crypto');

const validateMail = (req, _res, next) => {
  const { email } = req.body;
  const mailRegex = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
  if (!email) return next({ code: 400, message: 'O campo "email" é obrigatório' });
  if (!mailRegex) {
    return next({
      code: 400,
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
};

const validatePass = (req, _res, next) => {
  const { password } = req.body;
  const passRegex = /[\w\D]{6}/g.test(password);
  if (!password) return next({ code: 400, message: 'O campo "password" é obrigatório' });
  if (!passRegex) {
    return next({
      code: 400,
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
};

const validateToken = (req, _res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return next({ code: 401, message: 'Token não encontrado' });
  if (token.length !== 16) return next({ code: 401, message: 'Token inválido' });
  next();
};

const login = (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
};

module.exports = { login, validateMail, validatePass, validateToken };
