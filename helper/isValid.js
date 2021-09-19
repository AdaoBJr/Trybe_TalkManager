const emailRegex = /^[a-z0-9._-]+@[a-z0-9]+\.([a-z.]+)?$/i;
module.exports = (email, password) => {
  if (!email) {
    return { message: 'O campo "email" é obrigatório' };
  }
  if (!emailRegex.test(email)) {
    return { message: 'O "email" deve ter o formato "email@email.com"' };
  }
  if (!password) {
    return { message: 'O campo "password" é obrigatório' };
  }
  if (password.length < 6) {
    return { message: 'O "password" deve ter pelo menos 6 caracteres' };
  }
  return true;
};
