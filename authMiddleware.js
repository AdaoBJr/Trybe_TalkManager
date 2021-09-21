const validateEmail = (req, res, next) => {
    const { email } = req.body;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!email) {
      return res.status(400).send({ 
        message: 'O campo "email" é obrigatório' });
    }
  
    const emailIsValid = re.test(email);
  
    if (!emailIsValid) {
      return res.status(400).send({ 
        message: 'O "email" deve ter o formato "email@email.com"' });
    }
  
    next();
  };
  
  const validatePassword = (req, res, next) => {
    const { password } = req.body;
  
    if (!password) {
      return res.status(400)
        .send({ 
          message: 'O campo "password" é obrigatório' });
    }
  
    const passwordIsValid = (password.toString().length >= 6);
  
    if (!passwordIsValid) {
      return res.status(400)
        .send({ 
          message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
  
    next();
  };
  
  module.exports = {
    validateEmail,
    validatePassword,
  };