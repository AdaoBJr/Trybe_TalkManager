const crypto = require('crypto');

const tokenGenerator = async () => crypto.randomBytes(8).toString('hex');

const REG = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

const emailValidation = (email) => REG.test(String(email).toLowerCase());

module.exports = {
  tokenGenerator,
  emailValidation,
};
