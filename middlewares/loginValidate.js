const validateEmail = (email) => {
  const required = { message: 'O campo "email" é obrigatório' };
  const format = { message: 'O "email" deve ter o formato "email@email.com"' };

  if (!email) return required;
  const checFormat = email.includes('@') && email.includes('.com');
  if (!checFormat) return format;
  return 'pass';
};

const validatePassword = (password) => {
  const required = { message: 'O campo "password" é obrigatório' };
  const format = { message: 'O "password" deve ter pelo menos 6 caracteres' };

  if (!password) return required;
  if (password.length <= 6) return format;
  return 'pass';
};

module.exports = {
  validateEmail,
  validatePassword,
};
