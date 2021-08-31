const express = require('express');

const router = express.Router();

const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;

const getTalkers = async () => {
    const talkers = await fs.readFile('./talker.json', 'utf8');
    return JSON.parse(talkers);
};

router.get('/', async (req, res) => {
   const talkers = await getTalkers();
    res.status(HTTP_OK_STATUS).json(talkers);
  });

  router.get('/:id', (res, req) => {
    const { id } = req.params;
    console.log(id);
    res.status(200).json({ message: `get por id: ${id}` });
});

module.exports = router;