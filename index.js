const express = require('express');
const bodyParser = require('body-parser');
const { validateEmail, validatePassword, createToken } = require('./middleware/validations');

const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  fs.readFile('./talker.json', 'utf-8', (err, content) => {
    if(err){
      return res.status(200).json([]);
    }
    const data = JSON.parse(content);
    return res.status(200).json(data);
  });
});

app.get('/talker/:id', (req, res) => {
  fs.readFile('./talker.json', 'utf-8', (_err, content) => {
    const data = JSON.parse(content);
    const findId = data.find(({id}) => id === Number(req.params.id));
    if(!findId){
      return res.status(404).json(
        {
          "message": "Pessoa palestrante não encontrada"
        }
      );
    }
    return res.status(200).json(findId);
  });
});

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  return res.status(200).json(
    {
    token: createToken(),
    }
  );
});

app.listen(PORT, () => {
  console.log('Online');
});
