// const validateToken = (req, res, next) => {
//   const { token } = req.body;
//   if (!token || token.length !== 16) {
//     return res.status(401).json({ message: 'Token inválido' });
//   }

//   next();
// };

// const validateUserName = (req, res, next) => {
//   const { username } = req.body;

//   if (!username || username < 3) {
//     res.status(400).json({ message: 'Invalid username' });
//   }

//   next();
// };

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!email.includes('@') || !email.includes('.com')) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = {
  // validateToken,
  // validateUserName,
  validateEmail,
  validatePassword,
};
