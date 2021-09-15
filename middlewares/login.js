const getToken = require('../helper/getToken');
const isValid = require('../helper/isValid');

module.exports = (req, res, _next) => {
  const { email, password } = req.body;
  const validation = isValid(email, password);
  if (validation === 'noEmail') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (validation === 'wrongEmail') {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (validation === 'noPassword') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (validation === 'wrongPassword') {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).json(getToken());
};
