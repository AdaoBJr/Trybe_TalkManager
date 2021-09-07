const filesystem = require('./filesystem');
const sendErrorMessage = require('./sendErrorMessage');

module.exports = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const talker = filesystem.read(id);
  if (talker) {
    res.status(200).json(talker);
  } else {
    sendErrorMessage(404, 'Pessoa palestrante não encontrada', res);
  }
};
