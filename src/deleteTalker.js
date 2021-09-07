const filesystem = require('./filesystem');
const sendErrorMessage = require('./sendErrorMessage');
const validateToken = require('./validateToken');

module.exports = [
  validateToken,
  (req, res, _next) => {
    filesystem.deleteTalker(parseInt(req.params.id, 10));
    sendErrorMessage(200, 'Pessoa palestrante deletada com sucesso', res);
  },
];
