const crypto = require('crypto');

function gerarToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = { gerarToken };