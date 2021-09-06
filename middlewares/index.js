const validToken = (request, response, next) => {
    const token = request.headers.authorization;
    
    if (!token) {
      return response.status(401).json({
        message: 'Token não encontrado',
      });
    }
  
    if (token.length !== 16) {
      return response.status(401).json({
        message: 'Token inválido',
      });
    }
  
    next();
  };
  
  const validName = (request, response, next) => {
    const { name } = request.body;
    
    if (!name) {
      return response.status(400).json({
        message: 'O campo "name" é obrigatório',
      });
    }
  
    if (name.length < 3) {
      return response.status(400).json({
        message: 'O "name" deve ter pelo menos 3 caracteres',
      });
    }
  
    next();
  };
  
  const validAge = (request, response, next) => {
    const { age } = request.body;
    
    if (!age) {
      return response.status(400).json({
        message: 'O campo "age" é obrigatório',
      });
    }
  
    if (typeof age !== 'number' || age < 18) {
      return response.status(400).json({
        message: 'A pessoa palestrante deve ser maior de idade',
      });
    }
  
    next();
  };
  
  const validTalk = (request, response, next) => {
    const { talk } = request.body;
    
    if (!talk) {
      return response.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
    }
  
    if (!(talk.watchedAt && talk.rate) && talk.rate !== 0) {
      return response.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
    }
    
    next();
  };
  
  const validTalkKeys = (request, response, next) => {
    const { talk } = request.body;
    const formartDat = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
    
    if (!formartDat.test(talk.watchedAt)) {
      return response.status(400).json({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      });
    }
    
    if (typeof talk.rate !== 'number' || talk.rate > 5 || talk.rate < 1) {
      return response.status(400).json({
        message: 'O campo "rate" deve ser um inteiro de 1 à 5',
      });
    }
    
    next();
  };

  module.exports = {
      validAge,
      validName,
      validTalk,
      validTalkKeys,
      validToken,
  };
