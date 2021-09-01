const express = require('express');

const router = express.Router();

const TOKEN = '7mqaVRXJSp886CGr';

const authMiddleware = require('../middlewares/auth-middleware');

router.post('/', authMiddleware, (req, res) => {
  if (TOKEN.length < 16) return res.status(400).json({ message: 'Algo deu errado!' });

  res.status(200).json({ token: TOKEN });
});

module.exports = router;