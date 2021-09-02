const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTPP_ERROR_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res, next) => {
  try {
    const file = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));

    res.status(HTTP_OK_STATUS).json(file);

    next();
  } catch (err) {
    next({
      status: HTPP_ERROR_STATUS,
      message: err,
    });
  }
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const file = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
  const fileFilter = file.find((item) => item.id === Number(id));

  if (!fileFilter) {
    return res.status(HTPP_ERROR_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
    res.status(HTTP_OK_STATUS).json(fileFilter);
});

app.listen(PORT, () => {
  console.log('Online');
});
