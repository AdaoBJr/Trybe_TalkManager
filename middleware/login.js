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

// app.post('/login', 
// (req, res, next) => {
//   const { email } = req.body;
//   if (email === '') {
//         return res.status(401).send({ message: 'O campo "email" é obrigatório' });
//       } 

//   next(); // 1 Email com string vazia
// },
// (req, res, next) => { 
//   const { email } = req.body;
//   const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
//   if (validEmail.test(email) === false) {
//         return res.status(401).send({ message: 'O "email" deve ter o formato "email@email.com"' });
//       }
//   next(); // 2 Email sem validade do regex
// },
// (req, res, next) => {
//   const { password } = req.body;
//   if (password === '') {
//     return res.status(401).send({ message: 'O campo "password" é obrigatório' });
//       } 

//   next(); // 3 Password com string vazia
// },

// (req, res, next) => {
//   const SIX = 6;
//   const { password } = req.body;
//   if (password.length < SIX) {
//     return res.status(401).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
//       } 

//   next(); // 4 Password com número de caracteres insuficientes.
// },
// (req, res) => {
//   const { email, password } = req.body;
//   const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
//   const SIX = 6;
//   if (validEmail.test(email) && password.length > SIX) {
//        return res.status(200).json({ token: getToken() });
//       }
// });
