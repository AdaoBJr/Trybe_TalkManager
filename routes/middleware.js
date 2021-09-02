const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const isValidEmail = (req, res, next) => {
  const regex = /((\w+)@(\w+)\.(\w+))/i;
  const { email } = req.body;
  
  if (!email) {
   return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!email.match(regex)) {
    return res.status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
    
  next();
  };

const isValidPassword = (req, res, next) => {
  const { password } = req.body;
  // const passwordRegex = /^[0-9]*$/;
    
  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }

  // if (!password.match(passwordRegex)) {
  // return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  // }
  
  next();
  };
const isValidToken = (req, res, next) => {
  const { token } = req.headers.authorization;
  const tokenRegex = !/^[a-zA-Z0-9]{16}$/;
  
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  
  if (tokenRegex.test(token)) { 
  return res.status(401).json({ message: 'Token inválido' });
  }
    
  next();
  };
const isValidName = (req, res, next) => {
  const { name } = req.body;
  
  if (!name || name === '') {
  return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  
  if (name.length) { 
  return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
    
  next();
  };
const isValidAge = (req, res, next) => {
  const { age } = req.body;
  
  if (!age || age === '') {
  return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  
  if (Number(age) < 18) { 
  return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
    
  next();
  };

const isValidTalkWatchedAt = (req, res, next) => {
  const regexData = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[1-9]|2[1-9])$/;
  const { talk: { watchedAt, rate } } = req.body;

  if (!Number(rate) || !watchedAt) { 
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
    }

  if (watchedAt !== regexData) {
  return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  
  next();
  };
const isValidTalkRate = (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;

  if (!Number(rate) || !watchedAt) { 
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
    }
  
  if (!Number(rate) || rate < 5) { 
  return res.status(400)
  .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  
  next();
  };
  
  module.exports = { 
    isValidEmail, 
    isValidPassword, 
    isValidToken, 
    isValidName, 
    isValidAge,
    isValidTalkWatchedAt,
    isValidTalkRate,
   };