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

const isValidToken = (_req, res, next) => {
  res.status(200).json({ token: createToken(16) });
  next();
};

const isValidEmail = (req, res, next) => {
  const emailRegex = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi;
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: `O campo ${email} é obrigatório` }); 
  }
  if (email.match(emailRegex)) {
    return res.status(400).json({
      message: `O ${email} deve ter o formato "email@email.com"`,
      });
 }
  next();
};

module.exports = { isValidToken, isValidEmail };