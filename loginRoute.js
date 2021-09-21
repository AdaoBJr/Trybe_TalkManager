const express = require('express');
const crypto = require('crypto');

const loginRouter = express.Router();
// let token = null;
let token = '1234567891234567'

const generatesToken = () => {
  token = crypto.randomBytes(8).toString('hex');
};

const validatesEmail = (email) => {
  const regex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return regex.test(email);
};

const validateUserInfo = (email, isValidEmail, password, _res) => {
  if (!email) {
    // return res.status(400).json({
    //   message: 'O campo "email" é obrigatório',
    // });
    return "email";
  }
  if (!isValidEmail) {
    // return res.status(400).json({
    //   message: "O \"email\" deve ter o formato \"email@email.com\"",
    // });
    return "isValidEmail"
  }
  if (!password) {
    // return res.status(400).json({
    //   message: 'O campo "password" é obrigatório',
    // });
    return "password";
  }
  if (password.length < 6) {
    // return res.status(400).json({
    //   message: 'O "password" deve ter pelo menos 6 caracteres',
    // });
    return "passwordLength";
  }
};

loginRouter.post('/', async (req, res) => {
  const {
    email,
    password,
  } = req.body;
  const isValidEmail = validatesEmail(email);

  const validateResponse = validateUserInfo(email, isValidEmail, password);
  if (validateResponse === "email") {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  } else if (validateResponse === "isValidEmail") {
    return res.status(400).json({
      message: "O \"email\" deve ter o formato \"email@email.com\"",
    });
  } else if (validateResponse === "password") {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  } else if (validateResponse === "passwordLength") {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }

  // validateUserInfo(email, isValidEmail, password, res);
  await generatesToken();
  return res.status(200).json({
    token,
  });
});

module.exports = {
  loginRouter,
  token
};