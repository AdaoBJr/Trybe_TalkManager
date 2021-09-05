const BAD_REQUEST = 400;

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  const regexEmail = /\S+@\S+\.\S+/;
  const emailIsValid = regexEmail.test(email);

  if (!email) {
    return res.status(BAD_REQUEST)
      .json({ message: 'O campo "email" é obrigatório' });
  }

  if (!emailIsValid) {
    return res.status(BAD_REQUEST)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  return next();
};

module.exports = validateEmail;
