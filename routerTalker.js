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
  searchQueryTalker,
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

router.get('/search', validateToken, searchQueryTalker);

router.get('/:id', readFileId);

router.delete('/:id', validateToken, deleteTalker);

router.put('/:id',
validateToken,
validateName,
validateAge,
validateGeneralTalk,
validateTalk,
attTalker);

module.exports = router;
