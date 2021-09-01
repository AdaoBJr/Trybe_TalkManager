const fs = require('fs').promises;
const crypto = require('crypto');

// const de status de resposta
const OK_STATUS = 200;
const BAD_REQUEST_STATUS = 400;

console.log(fs);

// valida email campo e regex
const validEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(BAD_REQUEST_STATUS)
    .json({ message: 'O campo "email" é obrigatório' });
  }
  const emailok = new RegExp(/^\w+@\w+.\w{2,3}$/).test(email);
  if (!emailok) {
    return res.status(BAD_REQUEST_STATUS)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

// valida password campo vazio e namber
const validPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(BAD_REQUEST_STATUS)
    .json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(BAD_REQUEST_STATUS)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

/*
app.get('/recipes/:id', (req, res) => {
  const { id } = req.params;
  const result = recipes.find((elem) => elem.id === Number(id));
  if (!result) {
    return res.status(404).json({ message: 'Item nao encontarado' });
  }
  return res.status(200).json(result);
});

function getler() {
  return fs.readFile('./simpsons.json', 'utf-8')
  .then((fileContent) => JSON.parse(fileContent));
}

function setescri(newSimpsons) {
  return fs.writeFile('./simpsons.json', JSON.stringify(newSimpsons));
}
*/

// lendo os arquivos
const readFile = async () => {
    const file = await fs.readFile('./talker.json', 'utf8');
    return JSON.parse(file);
};

// escrevendo os arquivos
const writeFile = async (filePath, content) => {
try {
await fs.writeFile(filePath, JSON.stringify(content));
} catch (err) {
  console.error(`Erro ao escrever o arquivo ${filePath}\n Erro: ${err}`);
}
};

// gerador de tokem de validação
const generateToken = () => crypto.randomBytes(8).toString('hex');

// criando tokens
const createloginToken = (_req, res) => {
  const token = generateToken();
  return res.status(OK_STATUS)
  .json({ token });
};

// valida o token
const validaToken = (req, res, next) => {
  const { authorization } = req.headers;
 if (!authorization) {
 return res.status(401).json({ message: 'Token não encontrado' });
 }
 if (authorization.length !== 16) {
 return res.status(401).json({ message: 'Token inválido' });
 }
 next();
};

// valida campo name
const validaName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

// valida campo age
const validaAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(age) < 18) {
    res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

// valida campo talker1
const validaTalker = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  next();
};

// valida campo talker2
const validaTalkerFormato = (req, res, next) => {
  const { talk } = req.body;
  const pattern = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  if (!talk.watchedAt.match(pattern)) {
    res.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (Number(talk.rate) > 5 || Number(talk.rate) < 1) {
    res.status(400)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

// criar novo post palestrante
const createNewPalestrant = async (req, res) => {
  const { name, age, talk } = req.body;
  const result = await readFile();
  const novoPalestrante = {
    id: result.length + 1,
    name,
    age,
    talk,
  };
  const arr = [...result, novoPalestrante];
  await writeFile('./talker.json', arr);
  return res.status(201).json(novoPalestrante);
};

module.exports = {
  readFile,
  writeFile,
  generateToken,
  validEmail,
  validPassword,
  createloginToken,
  createNewPalestrant,
  validaToken,
  validaName,
  validaAge,
  validaTalker,
  validaTalkerFormato,

};