const validateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401)
        .send({ message: 'Token não encontrado' });
    }
  
    const tokenIsValid = (token.length === 16);
    if (!tokenIsValid) {
      return res.status(401)
        .send({ message: 'Token inválido' });
    }
    next();
  };
  
  const validateName = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({ message: 'O campo "name" é obrigatório' });
    }
  
    const nameIsValid = (name.length >= 3);
    if (!nameIsValid) {
      return res.status(400)
        .send({ 
          message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
  };
  
  const validateAge = (req, res, next) => {
    const { age } = req.body;
    if (!age) {
      return res.status(400)
        .send({ 
          message: 'O campo "age" é obrigatório' });
    }
  
    const ageIsValid = (age >= 18);
    if (!ageIsValid) {
      return res.status(400).json({ 
        message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
  };
  
  const talkIsValid = (talk) => {
    if (!talk) {
      return false;
    }
  
    if (!talk.watchedAt) {
      return false;
    }
  
    if (talk.rate === undefined) {
      return false;
    }
  
    return true;
  };
  
  const validateTalk = (req, res, next) => {
    const { talk } = req.body;
    if (!talkIsValid(talk)) {
      return res.status(400).send({ 
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
    }
  
    const re = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    const dateIsValid = re.test(talk.watchedAt);
    if (!dateIsValid) {
    return res.status(400).send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
  
    const rateIsValid = !!((talk.rate >= 1 && talk.rate <= 5));
    if (!rateIsValid) {
      return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
  };
  
  module.exports = {
    validateName,
    validateAge,
    validateTalk,
    validateToken,
  };