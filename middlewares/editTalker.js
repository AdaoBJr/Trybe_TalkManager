const { StatusCodes } = require('http-status-codes');
const fs = require('fs').promises;

const fileCall = './talker.json';

const putValid = async (req, res) => {
  const { id } = req.params;
  const file = JSON.parse(await fs.readFile(fileCall, 'utf-8'));

  const fileFilter = file.filter((talker) => talker.id !== Number(id));
  
  const newTalker = {
    ...req.body,
    id: Number(id),
  };

  fileFilter.push(newTalker);
  const fileEdit = fileFilter;
  await fs.writeFile(fileCall, JSON.stringify(fileEdit));
  return res.status(StatusCodes.OK).json(newTalker);
};

module.exports = { putValid };