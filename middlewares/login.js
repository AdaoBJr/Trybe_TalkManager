const crypto = require('crypto');
const HTTP_OK_STATUS = 200;

const login = (_require, response) => {
  const myToken = () => crypto.randomBytes(8).toString('hex');
  return response.status(HTTP_OK_STATUS).json({ token: myToken() });
};

module.exports = login;
