const { nameRegex, ageRegex, rateRegex, dateRegex } = require('./validators');

// HELPERS

function validateName(name) {
  if (!name) {
    return { message: 'O campo "name" é obrigatório' };
  } if (!nameRegex.test(name)) {
    return { message: 'O "name" deve ter pelo menos 3 caracteres' };
  } 

  return 1;
}

function validateAge(age) {
  if (!age) {
    return { message: 'O campo "age" é obrigatório' };   
  } if (!ageRegex.test(age)) {
    return { message: 'A pessoa palestrante deve ser maior de idade' };
  }
  return 1;
}

function testDateNRate(talk) {
  if (talk && !dateRegex.test(talk.watchedAt)) {
    return { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  }
  if (talk && !rateRegex.test(talk.rate)) {
    return { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  }
  return 1;
}

function validateTalk(talk) {
  if (!talk || !talk.watchedAt || talk.rate == null) {
    return {
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
       };
  } 
  return 1;
}

// MAIN FUNCTION 

function validateTalker(body) {
  const { name, age, talk } = body;
  const [
    validName, validAge, validTalk, validDateNRate,
  ] = [
    validateName(name),
    validateAge(age),
    validateTalk(talk),
    testDateNRate(talk),
  ];
  
  if (validName !== 1) return validName;
  if (validAge !== 1) return validAge;
  if (validTalk !== 1) return validTalk;
  if (validDateNRate !== 1) return validDateNRate;
  
  return 1;
}

module.exports = {
  validateTalker,
};