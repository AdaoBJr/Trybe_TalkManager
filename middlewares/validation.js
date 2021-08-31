const isValidEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) { 
    return res.status(400).json({ 
      message: 'O campo "email" é obrigatório', 
    }); 
  }

  if (!(email.includes('@') && email.includes('.'))) {
    return res.status(400).json({ 
      message: 'O "email" deve ter o formato "email@email.com"', 
    });
  }

  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;

  if (password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

function createToken(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() 
* charactersLength));
 }
 return result;
}
/* fonte da função createToken com nome original "makeid"
https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript */

module.exports = {
  isValidEmail,
  isValidPassword,
  createToken,
};