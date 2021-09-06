const express = require('express');

const router = express.Router();

router.post(
  '/talker',
  (req, res) => {
    // const { name, age, rate, date, token } = req.headers;
   res.status(200).json({ message: 'cheguei' });
  },
);

module.exports = router;