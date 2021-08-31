const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const talker = './talker.json';

// funções
const readFile = async (arquivo) => {
  const resposta = await fs.readFile(arquivo, 'utf8');
  const parseResposta = JSON.parse(resposta);
  return parseResposta;
};

const gerarToken = () => {
  const resultado = crypto.randomBytes(8).toString('hex');
  return resultado;
};

const validarEmail = (req, res, next) => {
  const {
    email,
  } = req.body;
  if (!email) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  if (!email.includes('@') || !email.includes('.com')) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
};

const validarPassword = (req, res, next) => {
  const {
    password,
  } = req.body;
  if (!password) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  if (password.toString().length < 6) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.post('/login', validarEmail, validarPassword, (req, res) => {
  res.status(200).json({
    token: gerarToken(),
  });
});

app.get('/talker/:id', async (req, res) => {
  const {
    id,
  } = req.params;
  const resposta = await readFile(talker);

  const findId = resposta.find((a) => a.id.toString() === id);

  if (!findId) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  return res.status(200).json(findId);
});

app.get('/talker', async (req, res) => {
  const resposta = await readFile(talker);
  return res.status(200).json(resposta);
});

app.listen(PORT, () => {
  console.log('Online');
});