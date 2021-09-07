const emailValidation = (email) => {
  const emailRegex = new RegExp(/^[\w.]+@[a-z]+.\w{3}$/g);
  return emailRegex.test(String(email).toLowerCase());
};
// Validação de email tirada de https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript

const validatedEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  const validated = emailValidation(email);
  if (!validated) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const validatedPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6 || typeof password !== 'string') {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = { validatedEmail, validatedPassword };
