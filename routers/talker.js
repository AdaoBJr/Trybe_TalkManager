const express = require('express');

const router = express.Router();

const fs = require('fs');

router.get('/', (_req, res) => {
  fs.readFile('../talker.json')
  .then((info) => {
 res.status(200).send(info)
  .catch((err) => { res.status(400).send({ erro: err }); }); 
});
});
module.exports = router;
