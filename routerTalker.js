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
  attTalker,
  deleteTalker,
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

router.put('/:id',
validateToken,
validateName,
validateAge,
validateGeneralTalk,
validateTalk,
attTalker);

router.delete('/:id', validateToken, deleteTalker);

router.get('/:id', readFileId);

module.exports = router;
