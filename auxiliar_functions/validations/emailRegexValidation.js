const emailRegexValidation = (email) => {
  const emailRegex = /\b[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}\b/i;

  const verify = emailRegex.test(email);

  return verify;
};

module.exports = emailRegexValidation;
