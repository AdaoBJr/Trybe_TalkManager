const generateToken = require('../utils/crypto');

const login = (req, res) => res.status(200).json({ token: generateToken() });

module.exports = {
  login,
};
