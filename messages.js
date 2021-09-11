const MESSAGES = {
  idNotFound: 'Pessoa palestrante não encontrada',
  tokenNotFound: 'Token não encontrado',
  minorAge: 'A pessoa palestrante deve ser maior de idade',
  invalidToken: 'Token inválido',
  emptyName: 'O campo "name" é obrigatório',
  emptyAge: 'O campo "age" é obrigatório',
  wrongNameLength: 'O "name" deve ter pelo menos 3 caracteres',
  emptyEmail: 'O campo "email" é obrigatório',
  wrongEmailFormat: 'O "email" deve ter o formato "email@email.com"',
  emptyPassword: 'O campo "password" é obrigatório',
  passwordLowerThenSix: 'O "password" deve ter pelo menos 6 caracteres',
  wrongDataFormat: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  invalidDateFormat: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  invalidRating: 'O campo "rate" deve ser um inteiro de 1 à 5',
  noEmptyTalk: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
  removeTalker: 'Pessoa palestrante deletada com sucesso',
};

module.exports = {
  MESSAGES,
};
