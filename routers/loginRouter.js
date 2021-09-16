const express = require('express');

const router = express.Router();
const crypto = require('crypto');

const token = crypto.randomBytes(8).toString('hex');

const emailVerification = (request, response, next) => {
  const { email } = request.body;

  const regexEmail = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);

  if (!email) {
    response.status(400).json(
      { message: 'O campo "email" é obrigatório' },
    );
  }

  if (!regexEmail.test(email)) {
    response.status(400).json(
      { message: 'O "email" deve ter o formato "email@email.com"' },
    );
  }
  next();
};

const passVerification = (request, response, next) => {
  const { password } = request.body;

  if (!password) {
    response.status(400).json(
      { message: 'O campo "password" é obrigatório' },
    );
  }

  if (password.length < 6) {
    response.status(400).json(
      { message: 'O "password" deve ter pelo menos 6 caracteres' },
    );
  }
  next();
};

router.post('/', emailVerification, passVerification, (_req, res) => {
  res.status(200).json({ token });
});

module.exports = router;
