const isValidToken = (req, res, next) => {
  const token = req.headers.authorization;  

  if (!token) return res.status(401).json({ message: 'Token não encontrado' });

  if (token.length < 16) return res.status(401).json({ message: 'Token inválido' });

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

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const isValidTalk = (req, res, next) => {
  const { talk } = req.body;  
  if (!talk) {
    return res.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  } 
  next();
};

const isValidWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;  
  const patternData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/; 

  if (!watchedAt || watchedAt === '') {
    return res.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  } 

  if (!patternData.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const isValidRate = (req, res, next) => {
  const { talk: { rate } } = req.body;    

  if (rate < 1 || rate > 5) {
    return res.status(400).json({ 
      message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  
  if (!rate || rate === '') {
    return res.status(400).json({
       message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  } 

  next();
};

module.exports = {
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidWatchedAt,
  isValidRate,
};
