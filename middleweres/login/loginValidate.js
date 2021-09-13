const tokenGenerator = require('../../auxiliar_functions/generators/tokenGenerator');
const { OK } = require('../../http_status/status');

const loginValidate = (req, res) => {
  const token = tokenGenerator(16);

  return res.status(OK).json({ token });
};

module.exports = loginValidate;
