const express = require('express');
const fs = require('fs');

const router = express.router();

const data = 'talker.json';

router.get('/talker', (_req, res) => {
  fs.readFile(data, 'utf-8')
    .then((response) => JSON.parse(response))
    .then((result) => res.status(200).json(result))
    .catch((_error) => []);
});

module.exports = router;
