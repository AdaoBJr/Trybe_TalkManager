const crypto = require('crypto');

const generatorToken = async () => {
  const getToken = await crypto.randomBytes(8).toString('hex');
  return getToken;
};

module.exports = generatorToken;