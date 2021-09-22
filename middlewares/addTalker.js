const { StatusCodes: { CREATED } } = require('http-status-codes');
const { writeFiles, readFiles } = require('../helpers/filesHandle');

module.exports = async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await readFiles();
  const talker = { id: talkers.length + 1, name, age, talk };
  talkers.push(talker);
  await writeFiles(talkers);
  return res.status(CREATED).send(talker);
};
