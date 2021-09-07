const crypto = require('crypto');

module.exports = (req, res) => {
  const token = crypto.randomBytes(8).toString('hex'); // código retirado do gabarito do exercicio 1 do dia anterior.
  const { email, password } = req.body;
  const emailRegex = /\S+@\S+\.\S+/.test(email);
  if (email === undefined) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailRegex) {
     return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password === undefined) { 
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).json({ token });
};
