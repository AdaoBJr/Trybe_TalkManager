const validateTalkerData = require('./validateTalkerData');
const validateToken = require('./validateToken');
const filesystem = require('./filesystem');

module.exports = [
  validateToken,
  validateTalkerData,
  (req, res, _next) => {
    const id = parseInt(req.params.id, 10);
    res
      .status(200)
      .send(filesystem.modify({ ...req.body, id }));
  },
];
