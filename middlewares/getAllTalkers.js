const { StatusCodes } = require('http-status-codes');
const fs = require('fs').promises;

const fileCall = './talker.json';

const getAll = async (_req, res) => {
  const file = JSON.parse(await fs.readFile(fileCall, 'utf-8'));

  res.status(StatusCodes.OK).json(file);
};

module.exports = { getAll };