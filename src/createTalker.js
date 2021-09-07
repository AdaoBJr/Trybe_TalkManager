const validateTalkerData = require('./validateTalkerData');
const validateToken = require('./validateToken');
const filesystem = require('./filesystem');

module.exports = [
  validateToken,
  validateTalkerData,
  (req, res, _next) => {
    res
      .status(201)
      .send(filesystem.create(req.body));
  },
];
