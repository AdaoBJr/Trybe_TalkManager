const crypto = require('crypto-js');
const express = require('express');

const router = express.Router();

const emailRegex = new RegExp(
  '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9]'
    + '(?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$',
  'i',
);

const inputValidation = ({ email, password }) => {
  if (!email) return new Error('O campo "email" é obrigatório');
  if (!emailRegex.test(email)) return new Error('O "email" deve ter o formato "email@email.com"');
  if (!password) return new Error('O campo "password" é obrigatório');
  if (password.length < 6) return new Error('O "password" deve ter pelo menos 6 caracteres');
  return null;
};

router.post('/', (req, res, next) => {
  const validate = inputValidation(req.body);
  if (validate instanceof Error) {
    validate.errCode = 400;
    return next(validate);
  }

  const randomToken = crypto.lib.WordArray.random(10).toString(
    crypto.enc.Base64,
  );
  res.status(200).json({ token: randomToken });
});

module.exports = router;
