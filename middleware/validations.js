// Tive ajuda dos colegas Rafael Mathias e Felippe Correia nesta função.
function createToken(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}

const isValidToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const isValidEmail = (req, res, next) => {
  const { email } = req.body;
  // const emailRegex = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi;(match(emailRegex)
  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' }); 
}
  if (!(email.includes('@') && email.includes('.com'))) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
 }
  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;
  const sizePassword = 6;
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < sizePassword) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const isValidName = (req, res, next) => {
  const characterSize = 3;
  const { name } = req.body;

  if (!name || name === '' || name === 'number') { 
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
 }

 if (name.length < characterSize) {
   return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
 }
 next();
};

const isValidAge = (req, res, next) => {
  const olderAge = 18;
  const { age } = req.body;
  
  if (!age || age === '') { 
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
 }

 if (age < olderAge) {
   return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
 }
 next();
};

const isValidTalk = (req, res, next) => {
  const { talk } = req.body;
  
  if (!talk) {
    return res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
);
  }
  next();
};

const isValidRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (Number(rate) < 1 || Number(rate) > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!Number(rate) || Number(rate) === '') {
    return res.status(400).json({
     message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' }); 
}
  next(); 
};

const isValidWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  
  const regexDate = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([12][0-9]{3})$/g;
  
  if (!watchedAt) {
    return res.status(400).json({
     message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' }); 
} 

  if (!watchedAt.match(regexDate)) { 
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
   } 
  next();
};

module.exports = { 
  isValidToken,
  isValidEmail,
  isValidPassword,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidWatchedAt, 
  isValidRate,
  createToken,
};