module.exports = (email, password) => {
  const emailRegex = /^[a-z0-9._-]+@[a-z0-9]+\.([a-z.]+)?$/i;
  if (!email) {
    return 'noEmail';
  }
  if (!emailRegex.test(email)) {
    return 'wrongEmail';
  }
  if (!password) {
    return 'noPassword';
  }
  if (password.length < 6) {
    return 'wrongPassword';
  }
  return true;
};
