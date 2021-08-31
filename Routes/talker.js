const express = require('express');
const { getAll } = require('../service/readLine');

const router = express.Router();

router.get('/talker', (req, res) => {
    const talkersList = getAll();
  res.status(200).send(talkersList);
});

module.exports = router;
