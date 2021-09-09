const express = require('express');
const { gerarToken } = require('../utils/index');
const { validarEmail, validarSenha } = require('../middlewares');

const login = express.Router();

login.post('/', (req, res) => {  
  const { email, password } = req.body;
  const checkEmail = validarEmail(email);
  const checkPassword = validarSenha(password);

  if (checkEmail !== 'ok') {
    return res.status(400).json(checkEmail);
  }

  if (checkPassword !== 'ok') {
    return res.status(400).json(checkPassword);
  }
  
  return res.status(200).json({
    token: gerarToken(),
  });
});

module.exports = login;
