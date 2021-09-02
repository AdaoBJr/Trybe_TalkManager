// Source: https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js
const crypto = require('crypto');

function generateRandomToken() {
  return crypto.randomBytes(8).toString('hex');
}

const validateUser = (req, res) => {
  const { email, password } = req.body;
  if (!email) { return res.status(400).json({ message: 'O campo "email" é obrigatório' }); }
  if (!email.match(/\S+@\S+\.\S+/)) { 
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
}
  if (!password) { return res.status(400).json({ message: 'O campo "password" é obrigatório' }); }
  if (password.length < 6) { 
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
}
  return res.status(200).json({ token: generateRandomToken() });
};

module.exports = validateUser;
