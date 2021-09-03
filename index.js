const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

function readFile() {
  let objData;
  const stringData = fs.readFileSync('talker.json', 'utf-8');
  if (stringData) {
    objData = JSON.parse(stringData);
  }
  return objData;
}

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  const objData = readFile();
  if (objData.length < 1) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
  return res.status(HTTP_OK_STATUS).json(objData); 
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const data = readFile();
  const filterPeople = data.filter((people) => people.id === parseFloat(id));
    if (filterPeople.length > 0) { 
      return res.status(HTTP_OK_STATUS).json(...filterPeople); 
    }
  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', () => {
  const token = crypto.randomBytes(8).toString('hex');
});

app.listen(PORT, () => {
  console.log('Online');
});
