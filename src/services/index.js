import crypto from 'crypto';

// GERADOR DE TOKEN
export const generateToken = () => (
  crypto.randomBytes(8).toString('hex')
);

// VALIDAÇÃO DO TOKEN
export const validateToken = (token) => {
  const regex = /^[\w]{16}$/i;
  const Token = regex.test(token);

  if (!token || !token.length) {
    return { status: 401, msg: 'Token não encontrado' };
  }
  if (!Token) {
    return { status: 401, msg: 'Token inválido' };
  }
  return { Ok: true };
};

// --------------------------------------------------------------------------------------------
// REQUISITO 3

// VALIDAÇÃO DE E-MAIL
export const validateEmail = (email) => {
  const regex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const Email = regex.test(email);
  if (!email || !email.length) {
    return { status: 400, msg: 'O campo "email" é obrigatório' };
  }
  if (!Email) {
    return { status: 400, msg: 'O "email" deve ter o formato "email@email.com"' };
  }
  return { Ok: true };
};

// VALIDAÇÃO DA SENHA
export const validatePwd = (password) => {
  if (!password || !password.length) {
    return { status: 400, msg: 'O campo "password" é obrigatório' };
  }
  if (password.length < 6) {
    return { status: 400, msg: 'O "password" deve ter pelo menos 6 caracteres' };
  }
  return { Ok: true };
};

// --------------------------------------------------------------------------------------------
// REQUISITO 4

// VALIDAÇÃO DO NOME
const validateName = (name) => {
  if (!name || !name.length) {
    return { status: 400, msg: 'O campo "name" é obrigatório' };
  }
  if (name.length < 3) {
    return { status: 400, msg: 'O "name" deve ter pelo menos 3 caracteres' };
  }
  return { Ok: true };
};

// VALIDAÇÃO DA IDADE
const validateAge = (age) => {
  if (!age || age === null) {
    return { status: 400, msg: 'O campo "age" é obrigatório' };
  }
  if (age < 18) {
    return { status: 400, msg: 'A pessoa palestrante deve ser maior de idade' };
  }
  return { Ok: true };
};

// VALIDAÇÃO DO CAMPO TALK
const validateTalk = (talk) => {
  if (!talk || !talk.watchedAt || !talk.rate) {
    return {
      status: 400,
      msg: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' };
  }
  return { Ok: true };
};

// VALIDAÇÃO DOS CAMPOS DE DATA E AVALIAÇÃO
const validateDateRate = (dateRate) => {
  const watchedAtRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  const rateRegex = /^[1-5]{1}$/;

  const date = watchedAtRegex.test(dateRate.watchedAt);
  const rate = rateRegex.test(dateRate.rate);

  if (!date) {
    return { status: 400, msg: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  }
  if (!rate) {
    return { status: 400, msg: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  }
  return { Ok: true };
};

// RESUME VALIDAÇÕES DE EMAIL, IDADE, TALK, DATA E AVALIAÇÃO
export const validateTalker = (name, age, talk) => {
  const validName = validateName(name);
  if (!validName.Ok) { return validName; }

  const validAge = validateAge(age);
  if (!validAge.Ok) { return validAge; }

  const validTalk = validateTalk(talk);
  if (!validTalk.Ok) { return validTalk; }

  const validDateRate = validateDateRate(talk);
  if (!validDateRate.Ok) { return validDateRate; }

  return { Ok: true };
};
