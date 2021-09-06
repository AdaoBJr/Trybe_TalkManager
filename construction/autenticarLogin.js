const emailNExiste = { message: 'O campo "email" é obrigatório' };
const emailInvalido = { message: 'O "email" deve ter o formato "email@email.com"' };
const passwordNExiste = { message: 'O campo "password" é obrigatório' };
const passwordInvalido = { message: 'O "password" deve ter pelo menos 6 caracteres' };

function confirmeEmail(req, res, next) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json(emailNExiste);
  }
  if (!email.match(/((\w+)@(\w+)\.(\w+))/i)) {
    return res.status(400).json(emailInvalido);
  }
  next();
}

function confirmePassword(req, res, next) {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json(passwordNExiste);
  }
  if (password.length <= 5) {
    return res.status(400).json(passwordInvalido);
  }
  next();
}

module.exports = { confirmeEmail, confirmePassword };
