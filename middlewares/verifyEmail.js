const verifyEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const isEmail = regex.test(email);

  if (!isEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
  }

next();
};

module.exports = verifyEmail;