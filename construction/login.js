const { generation } = require('./generation');
const autenticaLogin = require('./autenticarLogin');

const HTTP_OK_STATUS = 200;

function login(req, res) {
  autenticaLogin(req, res);
  const aux = generation(16);

  return res.status(HTTP_OK_STATUS).json({ token: aux });
}

module.exports = login;
