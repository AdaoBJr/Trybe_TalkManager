const express = require('express');
const { 
  readFile,
  validateName,
  readFileId,
  validateToken,
  validateAge,
  validateTalk,
  validateGeneralTalk,
  readAndWrite,
} = require('./middlewaresTalker');

const router = express.Router();

router.post('/',
 validateToken,
 validateName,
 validateAge,
 validateGeneralTalk,
 validateTalk,
 readAndWrite);

router.get('/', readFile);

router.get('/:id', readFileId);

module.exports = router;
