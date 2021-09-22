const { StatusCodes: { OK } } = require('http-status-codes');
const { readFiles } = require('../helpers/filesHandle');

module.exports = async (_req, res) => {
  const file = await readFiles();
  return res.status(OK).send(file);
};
