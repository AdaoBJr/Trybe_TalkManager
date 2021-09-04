const validatePassword = (req, res, next) => {
  const { password } = req.body;
  
  const PASSWORD_LENGTH = 6;

  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });

  if (password.length < PASSWORD_LENGTH) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  const emailTester = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

  if (emailTester.test(email) === false) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

// const generateToken = (req, res, next) => {
//   const token = crypto.randomBytes(8).toString('hex');
//   next();
// };

module.exports = {
  validatePassword,
  validateEmail,
  // generateToken,
};
