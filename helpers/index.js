const cryptotoken = require('crypto');

function gerarToken() {
  return cryptotoken.randomBytes(8).toString('hex');
}

module.exports = { gerarToken };