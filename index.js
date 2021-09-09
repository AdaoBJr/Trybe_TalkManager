const express = require('express');
const bodyParser = require('body-parser');
const { gerarToken, readFile } = require('./helpers');

const { findOne,
  validarSenha,
  validarEmail, 
  validaToken, 
  editTalker,
  validaNome, 
  validaAge, 
  validaDate,
  validaRate, 
  validaTalk, 
  addTalker, 
  deletaTalker,
  seachTalker, } = require('./meddlewares');

const app = express();
app.use(bodyParser.json());
const HTTP_OK_STATUS = 200;
const PORT = '3000';
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search', 
  validaToken,
  seachTalker);

app.get('/talker', async (req, res) => {  
 const talkers = await readFile();
 if (talkers.length === 0) return res.status(200).json(Array.from([]));
 return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {  
  const { id } = req.params;
  const talkers = await readFile();
  const talkerFind = findOne(id, talkers);  
    if (talkerFind) {
     return res.status(200).json(talkerFind);      
    }
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
});

app.post('/login', (req, res) => {  
  const { email, password } = req.body;
  const checkEmail = validarEmail(email);
  const checkPassword = validarSenha(password);
  if (checkEmail !== 'ok') res.status(400).json(checkEmail);
  if (checkPassword !== 'ok') res.status(400).json(checkPassword);

  res.status(200).json({
    token: gerarToken(),
  });
});

app.post('/talker', 
  validaToken,
  validaNome, 
  validaAge, 
  validaTalk, 
  validaDate, 
  validaRate,   
  addTalker);

  app.put('/talker/:id', 
  validaToken,
  validaNome, 
  validaAge, 
  validaTalk, 
  validaDate, 
  validaRate,   
  editTalker);

app.delete('/talker/:id', 
  validaToken,  
  deletaTalker);

app.listen(PORT, () => {
  console.log('Online');
});
