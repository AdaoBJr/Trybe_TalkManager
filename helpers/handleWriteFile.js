const fs = require('fs').promises;

const NOME_ARQUIVO = './talker.json';

const handleWriteFile = (newTalker) => {
  const jsonNewTalker = JSON.stringify(newTalker);

  return fs.writeFile(NOME_ARQUIVO, jsonNewTalker);
};

module.exports = handleWriteFile;
