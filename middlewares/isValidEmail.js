const REGEX_EMAIL = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i;

const isValidEmail = (req, res, next) => {
  const { email } = req.body;

  if (email === undefined || email === '') { 
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  
  if (!email.match(REGEX_EMAIL)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"' });
  }
  
  next();
};

module.exports = isValidEmail;