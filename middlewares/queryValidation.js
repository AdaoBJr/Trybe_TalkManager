const { readContentFile } = require('../helpers/readWriteFiles');

const isValidQuery = async (req, res, next) => {
  const { q } = req.query;

  const talkers = await readContentFile();

  if (!q) return res.status(200).json(talkers);

  next();
};

module.exports = isValidQuery;