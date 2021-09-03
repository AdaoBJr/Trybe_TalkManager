const checkEmail = (req, res, next) => {
  const { email } = req.body;
  const testEmail = /\S+@\S+\.\S+/i.test(email);

  if (!email) {
    res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }

  if (!testEmail) {
    res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
};

module.exports = checkEmail;
