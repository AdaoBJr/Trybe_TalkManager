const dateRegexValidation = (date) => {
  const dataRegex = /^[0-9]{2}[/][0-9]{2}[/][0-9]{4}$/;

  const verifiedDate = dataRegex.test(date);

  return verifiedDate;
};

module.exports = dateRegexValidation;
