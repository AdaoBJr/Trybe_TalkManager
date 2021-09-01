const express = require('express');
const crypto = require('crypto');

const router = express.Router();
const HTTP_OK_STATUS = 200;
const HTTP_BADREQUEST_STATUS = 400;

const emailValidator = (req, res, next) => {
  const { email } = req.body;
  const regex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  if (!email) res.status(HTTP_BADREQUEST_STATUS).json({ message: 'O campo "email" é obrigatório' });
  if (!regex.test(email)) {
    res.status(HTTP_BADREQUEST_STATUS)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const passwordValidator = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    res.status(HTTP_BADREQUEST_STATUS).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    res.status(HTTP_BADREQUEST_STATUS).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    }); 
  }
  next();
};

router.post('/', emailValidator, passwordValidator, (_req, res) => {
  const randonToken = crypto.randomBytes(8).toString('hex');
  res.status(HTTP_OK_STATUS).json({ token: randonToken });
});

module.exports = router;

// /^[\w.]+@[a-z]+.\w{2,3}$/g
// /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g