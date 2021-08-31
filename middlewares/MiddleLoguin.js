const { validateData } = require('./validadeData');

function generateToken(length) {
   // source for function random token: https://www.ti-enxame.com/pt/javascript/crie-um-token-aleatorio-em-javascript-com-base-nos-detalhes-do-usuario/941136694/
  const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  const b = [];  
  for (let i = 0; i < length; i += 1) {
      const j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
  }
  return b.join('');
} 

const loguin = (req, res) => {
  const { email, password } = req.body;
  
  const token = generateToken(16);
  
  validateData(email, password, res);

  const emailIsValid = email.match(/((\w+)@(\w+)\.(\w+))/i);
  const passwordLength = 6;
  if (!emailIsValid) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password <= passwordLength) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  return res.status(200).json({ token });
};

module.exports = {
  loguin,
};
