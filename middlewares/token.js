const crypto = require('crypto');

const token = (_req, res) => {
  res.status(200).json({
    token: crypto.randomBytes(8).toString('hex'),
  });
};

module.exports = token;
