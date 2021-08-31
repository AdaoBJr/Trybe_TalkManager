const filesystem = require('./filesystem');

module.exports = (req, res) => {
  res.status(200).json(filesystem.getFileObject());
};
