const crypto = require('crypto');
// b8ae476ee6c5c129

function gerarToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = { gerarToken };