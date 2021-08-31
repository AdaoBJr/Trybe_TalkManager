const generateToken = () => {
  // edit the token allowed characters
  const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  const b = [];
  for (let i = 0; i < 16; i += 1) {
    const j = (Math.random() * (a.length - 1)).toFixed(0);
    b[i] = a[j];
  }
  return b.join('');
};

module.exports = generateToken;
