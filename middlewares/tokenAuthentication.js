const crypto = require('crypto');

const HTTP_OK_STATUS = 200;

const token = (_req, res) => {
  const randomToken = crypto.randomBytes(16).toString('base64')
    .replace(/[^A-Za-z0-9]/g, '').substring(0, 16);

    return res.status(HTTP_OK_STATUS).json({ token: randomToken });
};

module.exports = token;
