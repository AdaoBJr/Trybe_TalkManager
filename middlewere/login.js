// Função para generateToken de: https://www.ti-enxame.com/pt/javascript/crie-um-token-aleatorio-em-javascript-com-base-nos-detalhes-do-usuario/941136694/

function generateToken(n) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';
  for (let i = 0; i < n; i += 1) {
      token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400)
    .json({ message: 'O campo "email" é obrigatório' });
  }
  if (!password) {
    return res.status(400)
    .json({ message: 'O campo "password" é obrigatório' });
  }

  next();
};

const validateParams = (req, res, _next) => {
  const token = generateToken(16);
  const { email, password } = req.body;
  // Regex de Fernanda Porto
  const validateEmail = /\S+@\S+\.\S+/;
    
  if (!validateEmail.test(email)) {
    return res.status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password.length < 6) {
    return res.status(400)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  
  return res.status(200).json({ token });
};

module.exports = {
  login,
  validateParams,
};
