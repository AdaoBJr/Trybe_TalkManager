const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

const TALKER_FILE = 'talker.json';
router.get('/', (_req, res) => {
  fs.readFile(TALKER_FILE, 'utf-8') // Info vem em formato de string  
    .then((data) => JSON.parse(data))
    .then((data) => {
      res.status(200).json(data);
    });
});

module.exports = router;