const emailValidator = (req, res, next) => {
  const { email } = req.body;
  const emailRegEx = RegExp(/[a-z0-9]+@[a-z0-9]+\.[a-z0-9]{2,3}(\.[a-z0-9]+)?$/);

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!emailRegEx.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }

  next();
  };

  module.exports = { emailValidator };