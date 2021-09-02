const fs = require('fs').promises;

const NOME_ARQUIVO = './talker.json';

const handleReadFile = () => fs.readFile(NOME_ARQUIVO, 'utf-8');

module.exports = handleReadFile;
