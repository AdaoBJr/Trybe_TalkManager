const crypto = require('crypto');

const tokenGenerator = (length) => {
  const size = length / 2;
  const token = crypto.randomBytes(size).toString('hex');

  return token;
};

module.exports = tokenGenerator;
