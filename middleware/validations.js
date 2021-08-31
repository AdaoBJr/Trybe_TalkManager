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

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length > 16 || token.length < 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();  
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if ((!age || age === '') && (typeof age !== 'number')) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateWatched = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const validDate = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([12][0-9]{3})$/g;
  if (!watchedAt.match(validDate)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  const rating = Number(rate);
  if (!(rating >= 1 && rating <= 5)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  } 
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  // const { talk: { watchedAt, rate } } = req.body;
  if (!talk) {
    return res.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

/* const validateKeys = () => {

} */

module.exports = {
  validateEmail,
  validatePassword,
  createToken,
  validateToken,
  validateName,
  validateAge,
  validateWatched,
  validateRate,
  validateTalk,
};