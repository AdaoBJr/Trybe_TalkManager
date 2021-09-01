const findId = (id, listTalkers) => {
  const talkerFind = listTalkers.find((talker) => talker.id === +id);
  return talkerFind;
};

const validateEmail = (email) => {
  if (!email) return { message: 'O campo "email" é obrigatório' }; 
  const validEmail = email.includes('@') && email.includes('.com');
  if (!validEmail) return { message: 'O "email" deve ter o formato "email@email.com"' };
  return 'checado';
};

const validateSenha = (password) => {
  if (!password) return { message: 'O campo "password" é obrigatório' };  
  if (password.length < 6) return { message: 'O "password" deve ter pelo menos 6 caracteres' };
  return 'checado';
};

module.exports = {
  findId,
  validateEmail,
  validateSenha,
};