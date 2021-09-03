const SIX = 6;
const validEmail = /^[a-z0-9]+@[a-z]+\.[a-z]+$/; 

const authLogin = (req, res, next) => {
    const { email, password } = req.body;

  if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
      }
      // console.log(validEmail.test(email));
  if (!validEmail.test(email)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
      }

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
      }

  if (password.length < SIX) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
      }
      next(); 
};

module.exports = authLogin;
