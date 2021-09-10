const { readFile, writeFile } = require('fs').promises;

const ENCODING = 'utf8';

async function handleFileReading(filePath, encoding = ENCODING) {
  try {
    const fileContent = await readFile(filePath, encoding);
    const contentFormater = JSON.parse(fileContent);

    return contentFormater;
  } catch ({ message }) {
    console.error(`Erro ao ler o arquivo: ${JSON.stringify(message)}`);
  }
}

async function handleFileWriting(filePath, newContent) {
  try {
    const stringifyContent = JSON.stringify(newContent);
    
    await writeFile(filePath, stringifyContent);
  } catch ({ message }) {
    console.error(`Erro ao escrever o arquivo: ${message}`);
  }
}

module.exports = { handleFileReading, handleFileWriting };