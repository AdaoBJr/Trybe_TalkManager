const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const validation = require('./middlewares/validation')

fs.readFileSync('./talker.json');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  fs.readFile('./talker.json', (err, content) => {
    if (err) {
      return res.status(200).json([]);
    }
    return res.status(200).json(JSON.parse(content.toString('utf8')));
  });
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  
  fs.readFile('./talker.json', 'utf8', (_err, content) => {    
    const data = JSON.parse(content);
    const findTalker = data.find((talker) => talker.id === Number(id));

    if (!findTalker) {
  return res.status(404).json({
       message: 'Pessoa palestrante não encontrada' }); 
}
  return res.status(200).json(findTalker);
  });
});

app.post('/login', (req, res) => {
  const token = req.params.authorization;
  const

});

app.listen(PORT, () => {
  console.log('Online');
});
