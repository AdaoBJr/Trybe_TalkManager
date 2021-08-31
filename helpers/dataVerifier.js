// validador meia boca.
const checkDay = (day) => {
  if (day < 1 || day > 31) {
    return false;
  }
  return true;
};

const checkMonth = (month) => {
  if (month < 1 || month > 12) {
    return false;
  }
  return true;
};

const checkYear = (year) => {
  if (year < 1900 || year > 2100) { return false; }
  return true;
};

const dataVerifier = (date) => {
  const regex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  if (!regex.test(date)) return false;
  const dateParts = date.split('/');
  
  if (!checkDay(dateParts[0]) || !checkMonth(dateParts[1]) || !checkYear(dateParts[2])) {
    return false;
  }
  return true;
};

module.exports = dataVerifier;