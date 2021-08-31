const talker = require('express').Router();
const fs = require('fs');
const obj = require('../talker.json');

talker.get(
  '/talker',
  (_req, res) => res.status(200).json(fs.readFile(obj)),
); 
