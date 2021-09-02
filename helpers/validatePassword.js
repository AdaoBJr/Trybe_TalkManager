function validatePassword(password) {
  if (password === '' || !password) return 'empty';

  if (password.length < 6) return 'invalid';
}

module.exports = validatePassword;
