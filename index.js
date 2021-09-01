const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const talker = 'talker.json';

// funções
const readFile = async (arquivo) => {
  const resposta = await fs.readFile(arquivo, 'utf8');
  const parseResposta = JSON.parse(resposta);
  return parseResposta;
};

const writeFile = async (arquivo, escrever) => {
  await fs.writeFile(arquivo, escrever);
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

const validarToken = (req, res, next) => {
  const {
    authorization,
  } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }
  next();
};

const validarFormName = (req, res, next) => {
  const {
    name,
  } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 4) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validarFormAge = (req, res, next) => {
  const {
    age,
  } = req.body;
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validarFormTalk = (req, res, next) => {
  const {
    talk,
  } = req.body;
  if (!talk || !talk.watchedAt || talk.rate === undefined) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

const validarFormWatAndRate = (req, res, next) => {
  const {
    talk: { watchedAt, rate },
  } = req.body;
  // agradecimentos: https://www.guj.com.br/t/resolvido-como-validar-data-com-java-script/276656
  const regex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  if (!regex.test(watchedAt)) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
  }
  if (!(rate >= 1 && rate <= 5)) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
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

app.get('/talker/search', validarToken, async (req, res) => {
  const {
    name,
  } = req.query;
  const data = await readFile(talker);
  const filterName = data.filter((a) => a.name.includes(name));
    
  if (!name) {
    return res.status(200).json(data);
  }
  return res.status(200).json(filterName);
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

app.post('/talker', validarToken, validarFormName, validarFormAge,
  validarFormTalk, validarFormWatAndRate, async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const oldTalker = await readFile(talker);
  const id = oldTalker.length + 1;
  const newTalker = { id, name, age, talk: { watchedAt, rate } };
  oldTalker.push(newTalker);
  await writeFile(talker, JSON.stringify(oldTalker));
  res.status(201).json(
    newTalker,
  );
});

app.put('/talker/:id', validarToken, validarFormName, validarFormAge,
  validarFormTalk, validarFormWatAndRate, async (req, res) => {
  const {
    id,
  } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const oldTalker = await readFile(talker);
  const index = oldTalker.findIndex((a) => a.id.toString() === id);
  const leftTalker = oldTalker.filter((a) => a.id.toString() !== id);
  if (index === -1) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  const editTalker = { ...oldTalker[index], name, age, talk: { watchedAt, rate } };
  writeFile(talker, JSON.stringify([...leftTalker, editTalker]));
  return res.status(200).json(editTalker);
});

app.delete('/talker/:id', validarToken, async (req, res) => {
  const {
    id,
  } = req.params;
  const oldTalker = await readFile(talker);
  const leftTalker = oldTalker.filter((a) => a.id.toString() !== id);
  writeFile(talker, JSON.stringify(leftTalker));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => {
  console.log('Online');
});
