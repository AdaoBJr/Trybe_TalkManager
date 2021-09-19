// 3 - Crie o endpoint POST /login
const isValidLogin = require('../helper/isValid');
const getToken = require('../helper/getToken');

module.exports = (req, res, _next) => {
  const { email, password } = req.body;
  const validation = isValidLogin(email, password);
  if (validation !== true) {
    return res.status(400).json(validation);
  }
  return res.status(200).send(getToken());
};