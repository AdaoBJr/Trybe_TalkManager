const express = require('express');

const router = express.Router();
const { randomBytes } = require('crypto'); // token

const HTTP_OK_STATUS = 200;
const HTTP_ERROR_LOGUIN = 400;

const emailRegex = RegExp(/[a-z0-9]+@[a-z0-9]+\.[a-z0-9]{2,3}(\.[a-z0-9]+)?$/);
const MinPassword = 6;
const token = randomBytes(8).toString('hex'); // token

router.post('/', (req, res) => {
  const { email, password } = req.body; 
  if (!email) {
   return res.status(HTTP_ERROR_LOGUIN).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailRegex.test(email)) {
   return res.status(HTTP_ERROR_LOGUIN).send({ 
     message: 'O "email" deve ter o formato "email@email.com"', 
   });
  }
  if (!password) {
   return res.status(HTTP_ERROR_LOGUIN).send({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < MinPassword) {
   return res.status(HTTP_ERROR_LOGUIN).send({ 
     message: 'O "password" deve ter pelo menos 6 caracteres', 
   });
  }
   res.status(HTTP_OK_STATUS).send({ token });
 });

module.exports = router;