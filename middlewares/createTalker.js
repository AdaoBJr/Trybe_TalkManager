const { StatusCodes } = require('http-status-codes');
const fs = require('fs').promises;

const fileCall = './talker.json';

const postTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const file = JSON.parse(await fs.readFile(fileCall, 'utf-8'));
  const newTalker = {
    id: file.length + 1,
    name,
    age,
    talk,
  };

  file.push(newTalker);
  await fs.writeFile(fileCall, JSON.stringify(file));
  
  return res.status(StatusCodes.CREATED).json(newTalker);
};

module.exports = { postTalker };