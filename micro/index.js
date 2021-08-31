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

const validateEmail = (email, response) => {
    const parseEmail = /\b[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}\b/i;
    if (email === '' || !email) {
   response
      .status(400).json({ message: 'O campo "email" é obrigatório' }); 
  }
  
    if (!parseEmail.test(email)) {
      response
          .status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
    }
  };
  
  const validatePass = (password, response) => {
    if (password === '' || !password) {
   response.status(400)
    .json({ message: 'O campo "password" é obrigatório' }); 
  }
    if (password.length < 6) {
        response.status(400).json({
            message: 'O "password" deve ter pelo menos 6 caracteres',
          });
        }
  };

module.exports = { getTalker, getTalkerID, validateEmail, validatePass};