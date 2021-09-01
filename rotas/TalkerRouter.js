//------------------------------
// Lendo o arquivo talker,json
const express = require('express');

const fs = require('fs').promises;

const router = express.Router();

const HTTP_OK_STATUS = 200;

// Vai ler o meu arquivo e retorna uma promisse
const readTalkers = async () => {
    const talkers = await fs.readFile('./talker.json', 'utf-8');
    return JSON.parse(talkers);
};

// Resolvo a promisse anterior e andpoint GET
router.get('/', async (req, res) => {
    const resolvedTalkers = await readTalkers();
    res.status(HTTP_OK_STATUS).send(resolvedTalkers);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const talkers = await readTalkers();
    const talker = talkers.find((talk) => talk.id === Number(id));
    if (!talker) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    return res.status(HTTP_OK_STATUS).json(talker);
});

module.exports = router;
