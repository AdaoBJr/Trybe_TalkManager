const crypto = require('crypto');

exports.gerarToken = () => crypto.randomBytes(8).toString('hex'); // double

exports.validarEmail = (email) => {
  const regex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const Email = regex.test(email);
  if (!email) {
    return { status: 400, message: 'O campo "email" é obrigatório' };
  }
  if (!Email) {
    return { status: 400, message: 'O "email" deve ter o formato "email@email.com"' };
  }
  return { Ok: true };
};

exports.validarSenha = (password) => {
  if (!password) {
    return { status: 400, message: 'O campo "password" é obrigatório' };
  }
  if (password.length < 6) {
    return { status: 400, message: 'O "password" deve ter pelo menos 6 caracteres' };
  }
  return { Ok: true };
};

exports.validarToken = (token) => {
  const regex = /^[\w]{16}$/i;
  const Token = regex.test(token); // retorna true or false
  if (!token) {
    return { status: 401, message: 'Token não encontrado' };
  }
  if (!Token) {
    return { status: 401, message: 'Token inválido' };
  } 
  return { Ok: true };
};

const validarNome = (name) => {
  if (!name) {
    return { status: 400, message: 'O campo "name" é obrigatório' };
  }
  if (name.length < 3) {
    return { status: 400, message: 'O "name" deve ter pelo menos 3 caracteres' };
  }
  return { Ok: true };
};

const validarIdade = (age) => {
  if (!age) {
    return { status: 400, message: 'O campo "age" é obrigatório' };
  }
  if (age < 18) {
    return { status: 400, message: 'A pessoa palestrante deve ser maior de idade' };
  }
  return { Ok: true };
};

const validarData = (data) => {
  const regexWatchedAt = /^\d{2}\/\d{2}\/\d{4}$/; // formato da data
  const date = regexWatchedAt.test(data.watchedAt); // exec?

  if (!date) {
    return { status: 400, message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
   }
  return { Ok: true };
};

const validarRate = (talk) => {
  const { rate } = talk;
  if (rate < 1 || rate > 5) {
    return { status: 400, message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
 }
 return { Ok: true };
};

const validarTalk = (talk) => {
  if (!talk || !talk.watchedAt || !talk.rate) {
    return {
      status: 400,
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' };
  }
  return { Ok: true };
};

exports.validarTalker = (name, age, talk) => {
  const nomeValido = validarNome(name);
  if (!nomeValido.Ok) { return nomeValido; }

  const idadeValida = validarIdade(age);
  if (!idadeValida.Ok) { return idadeValida; }

  const talkValida = validarTalk(talk);
  if (!talkValida.Ok) { return talkValida; }

  const dataValida = validarData(talk);
  if (!dataValida.Ok) { return dataValida; }

  const validaRate = validarRate(talk);
  if (!validaRate.Ok) { return validaRate; }

  return { Ok: true };
};

// ------------------------------------------ //

// npm run restore
// npm run test nomeDoArquivoDeTeste.test.js
