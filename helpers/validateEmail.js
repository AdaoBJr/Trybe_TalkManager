const regexEmail = require('./utils');

function validateEmail(email) {
  if (email === '' || !email) return 'empty';

  if (!regexEmail(email)) return 'invalid';
}

module.exports = validateEmail;
