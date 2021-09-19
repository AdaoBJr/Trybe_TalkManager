const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

const nameValid = (name) => {
  if (name === undefined) return { message: 'O campo "name" é obrigatório' };
  if (name.length < 3) return { message: 'O "name" deve ter pelo menos 3 caracteres' };
};

const ageValid = (age) => {
  if (!age) return { message: 'O campo "age" é obrigatório' };
  if (age < 18) return { message: 'A pessoa palestrante deve ser maior de idade' };
};

const talkValid = (talk) => {
  if (!talk || !talk.watchedAt || talk.rate === undefined || talk.rate === null) {
    return {
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
  }
};

const dataValid = (date, rate) => {
  if (!dateRegex.test(date)) {
    return { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  }
  if (typeof rate !== 'number' || rate < 1 || rate > 5) {
    return { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  }
};

module.exports = (name, age, talk) => {
  const nameIsValid = nameValid(name);
  if (nameIsValid) return nameIsValid;

  const ageIsValid = ageValid(age);
  if (ageIsValid) return ageIsValid;

  const talkIsValid = talkValid(talk);
  if (talkIsValid) return talkIsValid;

  const dataIsValid = dataValid(talk.watchedAt, talk.rate);
  if (dataIsValid) return dataIsValid;

  return true;
};
