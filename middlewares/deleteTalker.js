const { StatusCodes } = require('http-status-codes');
const fs = require('fs').promises;

const fileCall = './talker.json';

const deleteValid = async (req, res) => {
  const { id } = req.params;
  const file = JSON.parse(await fs.readFile(fileCall, 'utf-8'));

  const fileFilter = file.filter((talker) => talker.id !== Number(id));
  const fileDelete = fileFilter;

  await fs.writeFile(fileCall, JSON.stringify(fileDelete));
  return res.status(StatusCodes.OK).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = { deleteValid };