const express = require('express');
const bodyParser = require('body-parser');
const micro = require('./micro');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const data = await micro.getTalker();
  response.status(HTTP_OK_STATUS).send(data);
});

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const { getTalkerID } = micro;
  const data = await getTalkerID(id);
  if (data) {
    return response.status(HTTP_OK_STATUS).send(data);
  }
  return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

// app.post('/talker', async (request, response) => {
//   const { name, age, talk: { watchedAt, rate } } = request.body;
//   const tolken = request.header('tolken');
//   if (!tolken) response.status(401).json({ message: 'Token não encontrado' });
//   if (tolken !== '7mqaVRXJSp886CGr') response.status(401).json({ message: 'Token inválido' });
//   if (name.length < 3) response.status(400).json({ message: 'O campo "name" é obrigatório' });
//   if (!name) response.status(400).json({ message: 'O campo "name" é obrigatório' });
//   if (age < 18) response.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
//   if (!age) response.status(400).json({ message: 'O campo "age" é obrigatório' });
//   if (/\d{2}/\d{2}/\d{4}/.validate())

//   response.status(200).send('OK');
// });

// app.post('/login', async (request, response, next) => {
//   const { email } = request.body;
//     const { validateEmail } = micro;
//     validateEmail(email, response);
//     next();
//   }, async (request, response, next) => {
//     const { password } = request.body;
//     const { validatePass } = micro;
//     validatePass(password, response);
//     next();
//   }, (_request, response) => response.status(200).json({ token: '7mqaVRXJSp886CGr' }));

app.listen(PORT, () => {
  console.log('Online');
});
