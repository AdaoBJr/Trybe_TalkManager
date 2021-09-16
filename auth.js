const crypto = require('crypto');

const generatesToken = () => {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
};

const validatesEmail = (email) => {
  const regex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return regex.test(email);
};

const checkAuthValidation = (email, validateEmail, password) => {
  if (!email) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório'
    });
  }
  if (!validateEmail) {
    return res.status(400).json({
      message: 'O email deve ter o formato "email@email.com"',
    });
  }
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
};

const authLogin = (req, res) => {
  const {
    email,
    password,
  } = req.body;
  const validateEmail = validatesEmail(email);

  checkAuthValidation(email, validateEmail, password);

  return res.status(200).json({
    token: generatesToken(),
  });
};

module.exports = {
  authLogin
};