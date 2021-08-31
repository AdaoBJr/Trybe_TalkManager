const express = require('express');
const { validateEmail, validatePassword } = require('../middleware/validationMiddleware');

const router = express.Router();
const token = {
  token: '7mqaVRXJSp886CGr',
};
router.post('/', validateEmail, validatePassword, (req, res) => {
  res.status(200).json(token);
});

module.exports = router;