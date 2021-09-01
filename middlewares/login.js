const { generateToken } = require('../fsFunctions.js');

const HTTP_OK_STATUS = 200;
const HTTP_FAIL_STATUS = 400;

const login = (req, res) => {
  const { email, password } = req.body;
  const emailRegexTest = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g).test(email);
  if (!email) {
    return res.status(HTTP_FAIL_STATUS).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailRegexTest) {
    return res
      .status(HTTP_FAIL_STATUS).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res
      .status(HTTP_FAIL_STATUS).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res
      .status(HTTP_FAIL_STATUS).json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
  }
  return res.status(HTTP_OK_STATUS).json({ token: generateToken() });
};

module.exports = login;
