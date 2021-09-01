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
  const tokenClient = req.headers.authorization;

  if (!tokenClient) {
    res.status(401).json({ massage: 'Token não encontrado' });
  }
  if (tokenClient < 0 && tokenClient > 16) {
    res.status(401).json({ massage: 'Token invalido' });
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
  const namePerson = req.body.nome;

  if (!namePerson && namePerson === '') { 
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
 }

 if (namePerson > characterSize) {
   return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
 }
 next();
};

const isValidAge = (req, res, next) => {
  const olderAge = 18;
  const { age } = req.body;
  
  if (!age && age === '') { 
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
 }

 if (Number(age) < olderAge) {
   return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
 }
 next();
};

const isValidTalk = (req, res, next) => {
  const { talk } = req.body;
  
  if (!talk && talk === {}) {
    return res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
);
  }
  next();
};

const isValidRate = (req, res, next) => {
  const { talk } = req.body;
  const rate = talk[1];
  const rateNumber = Number(rate);

  if (!rateNumber) {
    return res.status(400).json({
     message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' }); 
}
  
  if (rateNumber < 1 && rateNumber > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next(); 
};

const isValidWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const watchedAt = talk[0];
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