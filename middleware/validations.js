// Tive ajuda dos colegas Rafael Mathias e Felippe Correia nesta função.
function createToken(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}

const isValidToken = (req, res, next) => {
  const tokenClient = req.headers.authorization;

  if (!tokenClient) {
    res.status(400).json({ massage: 'Token não encontrado' });
  }
  if (tokenClient < 0 && tokenClient > 16) {
    res.status(400).json({ massage: 'Token invalido' });
  }
  next();
};

const isValidEmail = (req, res, next) => {
  const { email } = req.body;
  // const emailRegex = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi;(match(emailRegex)
  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' }); 
}
  if (!(email.includes('@') && email.includes('.com'))) {
    return res.status(400).json(
      { message: 'O "email" deve ter o formato "email@email.com"' },
);
 }
  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;
  const sizePassword = 6;

  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });

  if (password.length < sizePassword) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = { isValidToken, isValidEmail, isValidPassword, createToken };