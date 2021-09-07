const fs = require('fs').promises;

const NOME_ARQUIVO = './talker.json';

const handleWriteFile = (newTalker) => {
  const jsonNewTalker = JSON.stringify(newTalker);

  return fs.writeFile(NOME_ARQUIVO, jsonNewTalker);
  // .then(() => {
  //   console.log('Arquivo escrito com sucesso!');
  // })
  // .catch((err) => {
  //   console.error(`Erro ao escrever o arquivo: ${err.message}`);
  // });
};

module.exports = handleWriteFile;
