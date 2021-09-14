const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;

const readFile = async () => {
    const talkers = await fs.readFile('./talker.json', 'utf8');
    return JSON.parse(talkers);
};

router.get('/', async (_req, res) => {
    const talkers = await readFile();
    res.status(HTTP_OK_STATUS).json(talkers);
});

module.exports = router;
