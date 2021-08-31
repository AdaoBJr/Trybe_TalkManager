const rescue = require('express-rescue');
const talkersUtils = require('../fs-utils.js');

const HTTP_OK_STATUS = 200;

const deleteTalker = rescue(async (req, res) => {
  const talkersList = await talkersUtils.readFile();
  res.status(HTTP_OK_STATUS).json(talkersList);
});

module.exports = deleteTalker;
