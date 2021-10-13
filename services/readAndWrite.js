// Importação do FS
const { readFile, writeFile } = require('fs').promises;

// encoding do arquivo a ser escrito
const ENCODING = 'utf8';

// Função para ler arquivos
async function handleFileReading(filePath, encoding = ENCODING) {
  try {
    const fileContent = await readFile(filePath, encoding);
    const contentFormater = JSON.parse(fileContent);

    return contentFormater;
  } catch ({ message }) {
    console.error(`Erro ao ler o arquivo: ${JSON.stringify(message)}`);
  }
}

// Função para escrever em arquivos
async function handleFileWriting(filePath, newContent, encoding = ENCODING) {
  try {
    const stringifyContent = JSON.stringify(newContent);
    
    await writeFile(filePath, stringifyContent, encoding);
  } catch ({ message }) {
    console.error(`Erro ao escrever o arquivo: ${message}`);
  }
}

// Exportação das funções
module.exports = { handleFileReading, handleFileWriting };