const { StatusCodes } = require('http-status-codes');
const fs = require('fs').promises;

const fileCall = './talker.json';

const searchTalker = async (req, res) => {
  const { q } = req.query;
  const file = JSON.parse(await fs.readFile(fileCall, 'utf-8'));

  if (!q) {
    return res.status(StatusCodes.OK).json(file);
  }
  const search = file.filter(({ name }) => name.includes(q));
  return res.status(StatusCodes.OK).json(search);
};

module.exports = { searchTalker };