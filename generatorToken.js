const crypto = require('crypto');

const generatorToken = () => crypto.randomBytes(8).toString('hex');

module.exports = generatorToken;