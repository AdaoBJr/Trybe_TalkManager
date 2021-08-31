function validateEmail(res, req, next) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!(email === '@' && email === '.com')) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  next();    
}

function validatePassword(res, req, next) {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password <= 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}

module.exports = {
  validateEmail,
  validatePassword,
};