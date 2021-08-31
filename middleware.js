const fs = require('fs').promises;
const crypto = require('crypto');

// const de status de resposta
const OK_STATUS = 200;
const BAD_REQUEST_STATUS = 400;

console.log(fs);

// valida email campo e regex //
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
await fs.writeFile(filePath, content);
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

module.exports = {
  readFile,
  writeFile,
  generateToken,
  validEmail,
  validPassword,
  createloginToken,

};