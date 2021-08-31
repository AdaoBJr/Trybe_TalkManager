const emailNExiste = { message: 'O campo "email" é obrigatório' };
const emailInvalido = { message: 'O "email" deve ter o formato "email@email.com"' };
const passwordNExiste = { message: 'O campo "password" é obrigatório' };
const passwordInvalido = { message: 'O "password" deve ter pelo menos 6 caracteres' };

function confirmeEmail(email, res) {
  if (!email) {
    return res.status(400).json(emailNExiste);
  }
  if (!email.match(/((\w+)@(\w+)\.(\w+))/i)) {
    return res.status(400).json(emailInvalido);
  }
}

function confirmePassword(password, res) {
  if (!password) {
    return res.status(400).json(passwordNExiste);
  }
  if (password.length < 5) {
    return res.status(400).json(passwordInvalido);
  }
}

function autenticaLogin(req, res) {
  confirmeEmail(req.body.email, res);
  confirmePassword(req.body.password, res);
}

module.exports = autenticaLogin;
