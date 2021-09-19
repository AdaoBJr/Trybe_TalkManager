const isValidTalker = require('../helper/isValidTalker');

module.exports = (req, res, next) => {
  const { name, age, talk } = req.body;
  const validation = isValidTalker(name, age, talk);
  if (validation.message) {
    return res.status(400).json(validation);
  }
  next();
};
