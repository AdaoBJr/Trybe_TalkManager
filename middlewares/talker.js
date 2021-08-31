const rescue = require('express-rescue');
const talkersUtils = require('../utils.js');

const HTTP_OK_STATUS = 200;

const talker = rescue(async (req, res) => {
  const talkersList = await talkersUtils.readFile();
  res.status(HTTP_OK_STATUS).json(talkersList);
});

module.exports = talker;
