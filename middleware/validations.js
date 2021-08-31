const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  
  if (email === '' || !email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } 

  if (!(email.includes('@') && email.includes('.com'))) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  
  next();
};

// fonte da função createToken https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function createToken(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) { 
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  } 
  return result; 
}

module.exports = {
  validateEmail,
  validatePassword,
  createToken,
};