const { randomBytes } = require('crypto');

function tokenGen() {
  const token = randomBytes(8).toString('hex');

  return token;
}

module.exports = tokenGen;
