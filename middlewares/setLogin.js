const { emailRegex, passwordRegex } = require('../services/validators');

const generateToken = require('../services/generateToken');

function setLogin(req, res) {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  } if (!emailRegex.test(email)) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  } if (!password) {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  } if (!passwordRegex.test(password)) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const token = generateToken();
  return res.status(200).send({ token });
}

module.exports = { setLogin };