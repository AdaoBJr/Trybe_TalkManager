const crypto = require('crypto');
const { validateData } = require('./validadeData');

const loguin = (req, res) => {
  const { email, password } = req.body;
  
  validateData(email, password, res);

  const emailIsValid = /((\w+)@(\w+)\.(\w+))/;
  if (!email.match(emailIsValid)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  
  const passwordLength = 6;
  if (password < passwordLength) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  const token = crypto.randomBytes(8).toString('hex');

  return res.status(200).json({ token });
};

module.exports = {
  loguin,
};
//