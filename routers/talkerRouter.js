const express = require('express');

const router = express.Router();

const fs = require('fs').promises;

const arquivo = './talker.json';

router.get('/', (_req, res) => {
  let data = [];
  fs.readFile(arquivo, 'utf8')
  .then((info) => JSON.parse(info))
  .then((info) => {
    data = info;
    return res.status(200).json(data);
  })
.catch((err) => { res.status(400).json(err); });
});
module.exports = router;
