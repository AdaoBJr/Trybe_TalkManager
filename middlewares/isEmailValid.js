function isEmailValid(req, res, next) {
  const { email } = req.body;
  const regex = /[a-z0-9]+@[a-z]+.com/i;
  if (!email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } else if (!(regex.test(email))) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
}

module.exports = isEmailValid;
