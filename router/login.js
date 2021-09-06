const express = require('express');
const crypto = require('crypto');

const router = express.Router();

router.post('/login', 
  (request, response, next) => {
    const { email } = request.body;

    if (!email) {
      return response.status(400).json({
        message: 'O campo "email" é obrigatório',
      });
    }
    
    if (!(email.includes('@') && email.includes('.com'))) {
      return response.status(400).json({
        message: 'O "email" deve ter o formato "email@email.com"',
      });
    }

    next();
  },
  (request, response, next) => {
    const { password } = request.body;

    if (!password) {
      return response.status(400).json({
        message: 'O campo "password" é obrigatório',
      });
    }

    if (password.length < 6) {
      return response.status(400).json({
        message: 'O "password" deve ter pelo menos 6 caracteres',
      });
    }

    next();
  },
  (_request, response) => {
    const token = crypto.randomBytes(8).toString('hex');
    
    return response.status(200).json({ token });
  });

  module.exports = router;