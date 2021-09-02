const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MIDDLEWARE PARA LER O DOCUMENTO TALKER
const toRead = () => (
  fs.readFile('./talker.json')
  .then((response) => JSON.parse(response))
);

// MIDDLEWARE PARA ESCREVER NO DOCUMENTO TALKER
const toWrite = (content) => (
  fs.writeFile('./talker.json', JSON.stringify(content), 'utf8')
);

// MIDDLEWARE PARA GERAR TOKEN ALEATÓRIO
const toToken = () => {
  let text = '';
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 16; i += 1) {
    text += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  
  return text;
};

// MIDDLEWARE PARA RETORNAR O TOKEN
const toGenerateToken = (req, res, next) => {
  const token = toToken();
  req.headers.authorization = token;
  res.status(200).json({ token });
  next();
};

// MIDDLEWARE PARA VERIFICAR DO TOKEN
const toAnalizeToken = (req, res, next) => {
  const { token } = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length < 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

// MIDDLEWARE PARA VERIFICAR O NOME
const toName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

// MIDDLEWARE PARA VERIFICAR A IDADE
const toAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

// MIDDLEWARE PARA VERIFICAR O CAMPO TALK
const toTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};  

// MIDDLEWARE PARA VERIFICAR O CAMPO WACHEDAT
const toWachedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;

  if (!watchedAt || watchedAt === '') {
    return res.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
    }
  if (!(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/).test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

// MIDDLEWARE PARA VERIFICAR O CAMPO RATE
const toRate = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (!(/^[1-5]\d*$/).test(rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!rate || rate === '') {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next();
};

// MIDDLEWARE PARA VERIFICAR O EMAIL
const toEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

// MIDDLEWARE PARA VERIFICAR O PASSWORD
const toPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

// MIDDLEWARE PARA VERIFICAR A QUERY
const toQuery = async (req, res, next) => {
  const { xablau } = req.query;
  const data = await toRead();

  if (!xablau) {
    return res.status(200).json(data);
  }

  next();
};

// REQUISITO 1
app.get('/talker', async (_req, res) => {
  const talkers = await toRead();

  if (!talkers) return res.status(200).json([]);
    
  return res.status(200).json(talkers);
});

// REQUISITO 7
app.get('/talker/search', toAnalizeToken, toQuery, async (req, res) => {
  const { xablau } = req.query;
  const data = await toRead();
  const filteredData = data.filter((talker) => talker.name.includes(xablau));

  return res.status(200).json({ filteredData });
});

// REQUISITO 2
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await toRead();
  const getData = data.find((talker) => talker.id === Number(id));
  
  if (!getData) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(200).json(getData);
});

// REQUISITO 3
app.post('/login', toEmail, toPassword, toGenerateToken);

// REQUISITO 4
app.post('/talker', toAnalizeToken, toName, toAge, toTalk, toWachedAt, toRate, async (req, res) => {
  const { name, age, talk } = req.body;
  const data = await toRead();
  const toGenerateId = data.length + 1;
  const addData = { id: toGenerateId, name, age, talk };
  data.push(addData);
  await toWrite(data);
  return res.status(201).json(addData);
});

// REQUISITO 5
app.put('/talker/:id',
  toAnalizeToken,
  toName,
  toAge,
  toTalk,
  toWachedAt,
  toRate,
  async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const data = await toRead();
  const dataIndex = data.findIndex((talker) => talker.id === Number(id));
  data[dataIndex] = { id: Number(id), name, age, talk };
  const addData = data[dataIndex];
  await toWrite(data);
  return res.status(200).json(addData);
});

// REQUISITO 6
app.delete('./talker/:id', toAnalizeToken, async (req, res) => {
  const { id } = req.params;
  const data = await toRead();
  const dataIndex = data.findIndex((talker) => talker.id === Number(id));
  data.splice(dataIndex, 1);
  await toWrite(data);
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
