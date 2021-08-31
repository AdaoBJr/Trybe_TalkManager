//------------------------------
// Lendo o arquivo talker,json
const express = require('express');

const fs = require('fs').promises;

const router = express.Router();

// Vai ler o meu arquivo e retorna uma promisse
const readTalkers = async () => {
    const talkers = await fs.readFile('./talker.json', 'utf-8');
    return JSON.parse(talkers);
};

// Resolvo a promisse anterior e andpoint GET
router.get('/', async (req, res) => {
    const resolvedTalkers = await readTalkers();
    res.status(200).send(resolvedTalkers);
});

module.exports = router;
