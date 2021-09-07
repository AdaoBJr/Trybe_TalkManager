const validateToken = (authorization) => {
  if (!authorization) throw new Error('Token não encontrado');
  if (authorization.length < 16) throw new Error('Token inválido');

  return false;
};

const validateName = (name) => {
  if (name === undefined) throw new Error('O campo "name" é obrigatório');
  if (name.length < 3) throw new Error('O "name" deve ter pelo menos 3 caracteres');
};

const validateDate = (watchedAt) => {
  const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/; // regex retirado da fonte https://www.regular-expressions.info/dates.html#:~:text=To%20match%20a%20date%20in,%5D)%5B%2D%20%2F.%5D

  if (!regexDate.test(watchedAt)) {
    throw new Error('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
  }
};

const validateAge = (age) => {
  if (!age) throw new Error('O campo "age" é obrigatório');
  if (age < 18) throw new Error('A pessoa palestrante deve ser maior de idade');
};

const validateTalk = (element) => {
  if (!element.talk.watchedAt || element.talk.watchedAt === undefined) return true;
};

const validating = (element) => {
  if (element.talk === undefined
    || validateTalk(element)
    || element.talk.rate === ''
    || element.talk.rate === undefined) {
      throw new Error('O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios'); 
  } 
};

const validateRate = (rate) => {
  if (Number(rate) < 1 || Number(rate) > 5) {
    throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
}
};

const allValidated = (element) => {
  validating(element);
  validateName(element.name);
  validateAge(element.age);
  validateDate(element.talk.watchedAt);
  validateRate(element.talk.rate);
};

module.exports = {
  validateAge,
  validateTalk,
  validateName,
  validateRate,
  validateToken,
  validateDate,
  allValidated,
};
