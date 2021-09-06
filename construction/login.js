const crypto = require('crypto');

const HTTP_OK_STATUS = 200;

function login(_req, res) {
  const auxToken = crypto.randomBytes(8).toString('hex');
  return res.status(HTTP_OK_STATUS).json({ token: auxToken });
}

module.exports = login;
