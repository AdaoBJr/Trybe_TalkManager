const isValidEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email || email === '') { 
    return res.status(400).json({ 
      message: 'O campo "email" é obrigatório', 
    }); 
  }

  if (!(email.includes('@') && email.includes('.com'))) {
    return res.status(400).json({ 
      message: 'O "email" deve ter o formato "email@email.com"', 
    });
  }
  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const isValidToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (token.length < 16 || token.length > 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const isValidName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const isValidAge = (req, res, next) => {
  const { age } = req.body;

  if (!Number(age)) {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }

  if (Number(age) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

//   // 👉 fonte do código Regex => https://support.dooblo.net/hc/en-us/articles/208295925-How-To-Validate-Date-Format-Using-Regular-Expression 👇

const isValidDate = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  
  const regexDateValid = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([12][0-9]{3})$/g;

  if (!watchedAt) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  if (!watchedAt.match(regexDateValid)) {
    return res.status(400).json({ 
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"', 
    });
  }
  next();
};

const isValidRate = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (!Number(rate)) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  
  if (!(Number(rate) >= 1 && Number(rate) <= 5)) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
};

const isValidTalk = (req, res, next) => {
  const { talk } = req.body;
  
  if (!talk) {
    res.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

/* fonte da função createToken com nome original "makeid"
https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript */
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

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidToken,
  isValidName,
  isValidAge,
  isValidDate,
  isValidRate,
  isValidTalk,
  createToken,
};