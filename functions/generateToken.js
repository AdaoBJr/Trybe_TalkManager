function generateToken(n) {
  let token = '';
  const caracters = 'ABCDEFGHIJKLEMNOPQRSTUVXWYZabcdefghijklmnopqrstuvxwyz0123456789';
  for (let i = 0; i < n; i += 1) {
    token += caracters.charAt(Math.floor(Math.random() * caracters.length));
  }

  return token;
}

module.exports = generateToken;
