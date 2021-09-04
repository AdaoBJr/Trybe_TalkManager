import crypto from 'crypto';

// GERADOR DE TOKEN
export const generateToken = () => (
  crypto.randomBytes(8).toString('hex')
);

// VALIDAÇÃO DE E-MAIL
export const validateEmail = (email) => {
  const regex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const Email = regex.test(email);
  if (!email || !email.length) {
    return { eStatus: 400, eMsg: 'O campo "email" é obrigatório' };
  }
  if (!Email) {
    return { eStatus: 400, eMsg: 'O "email" deve ter o formato "email@email.com"' };
  }
  return { eOk: true };
};

// VALIDAÇÃO DA SENHA
export const validatePwd = (password) => {
  if (!password || !password.length) {
    return { pStatus: 400, pMsg: 'O campo "password" é obrigatório' };
  }
  if (password.length < 6) {
    return { pStatus: 400, pMsg: 'O "password" deve ter pelo menos 6 caracteres' };
  }
  return { pOk: true };
};
