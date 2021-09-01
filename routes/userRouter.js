const router = require('express').Router();
const {
    isValidToken,
    isValidEmail,
    isValidPassword,
  } = require('./middleware');

  router.post(
    '',
    isValidToken,
    isValidEmail,
    isValidPassword,
    (_req, res) => res.status(200).json({ token: '7mqaVRXJSp886CGr' }),
  );
  module.exports = router;