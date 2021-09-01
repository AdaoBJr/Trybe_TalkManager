const HTTP_400_STATUS = 400;
const minLength = 6;

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const validateEmail = (email) => {
  const regexEmail = new RegExp(/^[\w.]+@[a-z]+.\w{3}$/g);
  return regexEmail.test(String(email).toLowerCase());
};

const validEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(HTTP_400_STATUS).json({ message: 'O campo "email" é obrigatório' });
  }
  const validate = validateEmail(email);
  if (!validate) {
    return res.status(HTTP_400_STATUS)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const validPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(HTTP_400_STATUS).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < minLength || typeof password !== 'string') {
    return res.status(HTTP_400_STATUS)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = { validEmail, validPassword };
