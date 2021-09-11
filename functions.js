const randtoken = require('rand-token');
const validator = require('email-validator');
const validateDate = require('validate-date');

const findTalkerByID = (talkers, id) => talkers.find((e) => e.id === Number(id));

const findTalkersByName = (allTalkers, talkerName) => {
 const find = allTalkers.filter((e) => e.name.toLowerCase().includes(talkerName.toLowerCase()));
 return find;
};

const removeTalkerById = (talkers, id) => talkers.filter((e) => e.id !== Number(id));

const editTalker = (talker, body) => {
  const editedTalker = {
    ...talker,
    ...body,
  };
  return editedTalker;
};

const changeEditedTalker = (allTalkers, editedTalker) => {
  const editedTalkersList = allTalkers.map((e) => {
    if (e.id === editedTalker.id) return editedTalker;
    return e;
  });
  return editedTalkersList;
};

const generateToken = () => randtoken.generate(16);

const verifyEmailAndPassword = (email, password, MESSAGES) => {
  if (!email) return MESSAGES.emptyEmail;
  if (!password) return MESSAGES.emptyPassword;
  if (password.toString().length < 6) return MESSAGES.passwordLowerThenSix;
  const validEmail = validator.validate(email);
  if (!validEmail) return MESSAGES.wrongEmailFormat;
  return false;
};

const isValidDate = (date) => {
  if (date.includes('-')) return false;
  return validateDate(date, 'boolean', 'dd/mm/yyyy');
};

const addIdToTalk = (talkers, body) => {
  const maxId = talkers.reduce((acc, curr) => {
    if (curr.id > acc) return curr.id;
    return acc;
  }, 0);
  const newTalker = {
    id: maxId + 1,
    ...body,
  };
  return newTalker;
};

const verifyRateValueAndFormat = (rate) => {
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) return false;
  return true;
};

module.exports = {
  findTalkerByID,
  generateToken,
  verifyEmailAndPassword,
  addIdToTalk,
  isValidDate,
  verifyRateValueAndFormat,
  removeTalkerById,
  editTalker,
  changeEditedTalker,
  findTalkersByName,
};
