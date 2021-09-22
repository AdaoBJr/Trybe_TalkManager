const { StatusCodes: { BAD_REQUEST } } = require('http-status-codes');

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript

  if (!email) {
    return res.status(BAD_REQUEST)
              .json({ message: 'O campo "email" é obrigatório' });
  }
  if (!email.match(emailRegex)) {
    return res.status(BAD_REQUEST)
              .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

module.exports = validateEmail;
