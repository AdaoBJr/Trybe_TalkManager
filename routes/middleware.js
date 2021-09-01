const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const isValidToken = (req, res, next) => {
  const token = req.headers.authorization;
  const tokenRegex = !/^[a-zA-Z0-9]{16}$/;
  
  if (!token || tokenRegex.test(token)) return res.status(401).json({ message: 'invalid token' });
  
    next();
  };

const isValidEmail = (req, res, next) => { 
  const { email } = req.body;
  
  if (email.length === 0) {
   return res.status(400).json({ message: `O campo ${email} é obrigatório` });
  }

  if (!email.includes('@') || !email.includes('.com')) {
    return res.status(400)
    .json({ message: `O campo ${email}" deve ter o formato email@email.com` });
  }
    
  next();
  };

  const isValidPassword = (req, res, next) => {
    const { password } = req.body;
    const passwordRegex = /^[0-9]*$/;
    
    if (password.length !== 6) {
    return res.status(400).json({ message: 'O password deve ter pelo menos 6 caracteres' });
    }

    if (!password.match(passwordRegex)) {
    return res.status(400).json({ message: 'O campo password é obrigatório' });
    }
    
    next();
  };
  
  module.exports = { isValidToken, isValidEmail, isValidPassword };