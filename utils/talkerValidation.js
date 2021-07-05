const dateRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/(19[0-9]{2}|20[0-9]{2})$/i;
const testNameField = (name) => {
  if (!name) return new Error('O campo "name" é obrigatório');
  if (name.length < 3) {
    return new Error('O "name" deve ter pelo menos 3 caracteres');
  }
};
const testAgeField = (age) => {
  if (!age) return new Error('O campo "age" é obrigatório');
  if (parseInt(age, 10) < 18) {
    return new Error('A pessoa palestrante deve ser maior de idade');
  }
};

const testDate = (watchedAt) => {
  if (!dateRegex.test(watchedAt)) {
    return new Error('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
  }
};

const testRate = (rate) => {
  if (parseInt(rate, 10) < 1 || parseInt(rate, 10) > 5) {
    return new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  }
};

const testTalkField = ({ watchedAt, rate }) => {
  if (!(watchedAt && rate)) {
    return new Error(
      'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    );
  }

  return testDate(watchedAt) || testRate(rate) || null;
};

exports.talkerInputValidation = ({ name, age, talk = {} }) =>
  testNameField(name) || testAgeField(age) || testTalkField(talk) || null;