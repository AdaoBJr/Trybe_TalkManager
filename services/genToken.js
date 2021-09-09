module.exports = (length) => {
  const upper = () => String.fromCharCode(Math.floor(Math.random() * 25) + 65);
  const lower = () => String.fromCharCode(Math.floor(Math.random() * 25) + 97);
  let token = '';

  for (let i = 0; i < length; i += 1) {
    token += [upper(), lower()][Math.floor(Math.random() * 2)];
  }
  return token;
};
