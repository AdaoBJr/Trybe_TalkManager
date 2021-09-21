/* eslint-disable no-tabs */
const crypto = require('crypto');

// token.length está retornando undefined?
exports.gerarToken = () => crypto.randomBytes(8).toString('hex'); // double

exports.validarEmail = (email) => {
  const regex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
	const Email = regex.test(email);
	if (!email || email.length === 0) {
    return { status: 400, message: 'O campo "email" é obrigatório' };
  }
  if (!Email) {
    return { status: 400, message: 'O "email" deve ter o formato "email@email.com"' };
  }
  return { Ok: true };
};

exports.validarSenha = (password) => {
	if (!password || password.length === 0) {
    return { status: 400, message: 'O campo "password" é obrigatório' };
  }
  if (password.length < 6) {
    return { status: 400, message: 'O "password" deve ter pelo menos 6 caracteres' };
  }
  return { Ok: true };
};

// module.exports = { gerarToken };

// ------------------------------------------ //

// npm run restore
// npm run test nomeDoArquivoDeTeste.test.js
// instalar sucrase para usar import
// nodemon.json < { "execMap": { "js": "node -r sucrase/register"}}