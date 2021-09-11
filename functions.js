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

const generateToken = () => {
  // Thanks to:
  // https://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript/22028809
  const token = Array(16).fill(0).map(() => Math.random().toString(36).charAt(2)).join('');
  return token;
};

// Thanks to:
// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const emailTester = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Thanks to:
// https://www.npmjs.com/package/email-validator
// O avaliador não estava instalando o módulo
function emailValidator(email) {
  if (email.length > 254) { return false; }

  const valid = emailTester.test(email);
  if (!valid) { return false; }

  // Further checking of some things regex can't handle
  const parts = email.split('@');
  if (parts[0].length > 64) { return false; }

  const domainParts = parts[1].split('.');
  if (domainParts.some((part) => part.length > 63)) { return false; }

  return true;
}

const verifyEmailAndPassword = (email, password, MESSAGES) => {
  if (!email) return MESSAGES.emptyEmail;
  if (!password) return MESSAGES.emptyPassword;
  if (password.toString().length < 6) return MESSAGES.passwordLowerThenSix;
  const validEmail = emailValidator(email);
  if (!validEmail) return MESSAGES.wrongEmailFormat;
  return false;
};

// Thanks to:
// https://stackoverflow.com/questions/15491894/regex-to-validate-date-format-dd-mm-yyyy-with-leap-year-support
const isValidDate = (date) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
  const isValid = regex.test(date);
  return isValid;
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
