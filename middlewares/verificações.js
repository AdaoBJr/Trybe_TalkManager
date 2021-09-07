const verificaToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length < 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const verificaNome = (req, res, next) => {
  const { name } = req.headers;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const verificaIdade = (req, res, next) => {
  const { age } = req.headers;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const verificaData = (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;
  const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regexData.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um número de 1 à 5' });
  }
  next();
};

const verificaTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.rate || !talk.watchedAt) {
    return res.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

module.exports = {
verificaNome,
verificaToken,
verificaIdade,
verificaData,
verificaTalk,
};
