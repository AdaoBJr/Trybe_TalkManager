// Source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
// +
// Source: https://stackoverflow.com/questions/12317049/how-to-split-a-long-regular-expression-into-multiple-lines-in-javascript
function regexEmail(email) {
  const re = new RegExp(['^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()[\\]\\.,;:\\s@"]+)*)',
                         '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]',
                         '{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'].join(''));

  // Retorna True or False para a validação do regex
  return re.test(String(email).toLowerCase());
}

module.exports = regexEmail;