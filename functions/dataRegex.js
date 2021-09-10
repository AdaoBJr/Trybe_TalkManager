const validateData = (data) => {
  const dataRegex = /^[0-9]{2}[/][0-9]{2}[/][0-9]{4}$/;

  const verify = dataRegex.test(data);

  return verify;
};

module.exports = validateData;
