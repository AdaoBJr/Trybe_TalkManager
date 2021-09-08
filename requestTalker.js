const fs = require('fs');
const express = require('express');

const requestTalker = express.Router.get('/', (_req, res) => {
    try { 
        const data = fs.readFileSync('./talker.json', 'utf-8');
        const talkers = JSON.parse(data);

        res.status(200).json(talkers);
    } catch (err) {
        res.status(404).json({ Erro: err.message });
    }
});

module.exports = requestTalker;
