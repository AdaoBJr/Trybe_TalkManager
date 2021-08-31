const { readFile } = require('../fsFunctions.js');

const HTTP_OK_STATUS = 200;

const talker = async (req, res) => {
  const talkersObj = await readFile();
  return res.status(HTTP_OK_STATUS).json(talkersObj);
};

module.exports = talker;
