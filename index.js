const express = require('express');
const bodyParser = require('body-parser');
const talkerRoute = require('./talkerRoute');
const loginRoute = require('./loginRoute');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// const verifiesAuthHeader = (req, res, next) => {
//   const {
//     tokenPass,
//   } = req.query;

//   console.log(tokenPass);

//   if (!tokenPass) {
//     return res.status(401).json({
//       message: 'Token não encontrado',
//     });
//   }
//   if (!tokenPass !== token) {
//     return res.status(401).json({
//       message: 'Token inválido',
//     });
//   }
//   next();
// };

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkerRoute);
app.use('/login', loginRoute);

app.listen(PORT, () => {
  console.log('Online');
});