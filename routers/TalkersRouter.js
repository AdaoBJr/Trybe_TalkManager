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

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const talkers = await getTalkers();
    const talker = talkers.find((talk) => talk.id === Number(id));
    if (!talker || talker === undefined) {
    res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(200).json(talker);
});

module.exports = router;