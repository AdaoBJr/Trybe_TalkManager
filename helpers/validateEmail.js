const regexEmail = require('./regexEmail');

function validateEmail(email) {
  if (email === '' || !email) return 'empty';

  if (!regexEmail(email)) return 'invalid';
}

module.exports = validateEmail;
