const { StatusCodes } = require('http-status-codes');

const fs = require('fs').promises;

const fileCall = './talker.json';

const getFilterId = async (req, res) => {
  const { id } = req.params;
  const file = JSON.parse(await fs.readFile(fileCall, 'utf-8'));
  const fileFilter = file.find((item) => item.id === Number(id));

  if (!fileFilter) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  }
    res.status(StatusCodes.OK).json(fileFilter);
};

module.exports = { getFilterId };