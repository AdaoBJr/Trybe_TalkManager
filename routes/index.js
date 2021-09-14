const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;
const HTTP_ERROR_STATUS = 404;

const readFile = async () => {
    const talkers = await fs.readFile('./talker.json', 'utf8');
    return JSON.parse(talkers);
};

router.get('/', async (_req, res) => {
    const talkers = await readFile();
    res.status(HTTP_OK_STATUS).json(talkers);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const talkers = await readFile();
    const findTalker = talkers.find((talker) => talker.id === Number(id));

    if (findTalker) {
        return res.status(HTTP_OK_STATUS).json(findTalker);
    }
    return res.status(HTTP_ERROR_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = router;
