const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

function readFile(filePath) {
  const file = fs.readFile(filePath, 'utf-8');
  return file.then((data) => JSON.parse(data));
}

app.get('/talker', async (_req, res) => {
  const talkers = await readFile('./talker.json');
  return res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile('./talker.json');
  const talker = talkers.find((el) => el.id === parseInt(id, 10));

  if (!talker) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    }); 
}  
    
  return res.status(HTTP_OK_STATUS).send(talker);
});
