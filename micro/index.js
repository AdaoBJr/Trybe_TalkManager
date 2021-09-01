const fs = require('fs');

const file = './talker.json';

const getTalker = async () => {
    const data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data);
  };

const getTalkerID = async (id) => {
  const data = await getTalker();
  const out = data.find((talker) => talker.id === Number(id));
  return out;
};

const containEmail = (email, response, next) => {
  if (email === '' || !email) {
    return response
    .status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  next();
};

const formatEmail = (email, response, next) => {
  const parseEmail = /\b[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}\b/i;
  if (!parseEmail.test(email)) {
    return response
        .status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const containPass = (password, response, next) => {
  if (password === '' || !password) {
    return response.status(400)
      .json({ message: 'O campo "password" é obrigatório' });
    }
    next();
};
  
  const formatPass = (password, response, next) => {
    if (password.length < 6) {
        return response.status(400).json({
            message: 'O "password" deve ter pelo menos 6 caracteres',
          });
        }
      next();
  };

module.exports = { getTalker, getTalkerID, containEmail, formatEmail, containPass, formatPass };
