const { MESSAGES } = require('../messages');

function auth(req, res, next) {
  const { headers: { authorization } } = req;
  if (!authorization) return res.status(401).send({ message: MESSAGES.tokenNotFound });
  if (authorization.length !== 16) return res.status(401).send({ message: MESSAGES.invalidToken });
  next();
}

module.exports = {
  auth,
};
