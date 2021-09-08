const express = require('express');

const router = express.router();

const fs = require('fs');

router.get('/talker', (_req, res) => {
  const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  if (!talkers.length) {
    return res.status(200).json([]);
  }
  res.status(200).json(talkers);
});

module.exports = router;
