const express = require('express');
const rescue = require('express-rescue');
const getTalkers = require('../utils/getTalkers');
// const findTalkers = require('../utils/findTalkers');

const { STATUS_OK_HTTP } = require('../stats/constants');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkers = await getTalkers();
  res.status(STATUS_OK_HTTP).json(talkers);
});

router.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const talkersList = await getTalkers();
    const talker = talkersList.find((f) => f.id === Number(id));
    if (!talker || talker === undefined) { 
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
    }
    
    res.status(STATUS_OK_HTTP).json(talker);
  }),
);

module.exports = router;