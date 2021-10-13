// Importação do FS
const { readFile, writeFile } = require('fs').promises;

// encoding do arquivo a ser escrito
const ENCODING = 'utf8';

// Função para ler arquivos
async function handleFileReading(filePath, encoding = ENCODING) {
  try {
    // Constante que recebe o resultado da leitura do arquivo
    const fileContent = await readFile(filePath, encoding);
    // Constante com o conteúdo do arquivo formatado
    const contentFormater = JSON.parse(fileContent);

    // Retorno da leitura do arquivo
    return contentFormater;
  } catch ({ message }) {
    // Mensagem caso algo de errado aconteça
    console.error(`Erro ao ler o arquivo: ${JSON.stringify(message)}`);
  }
}

// Função para escrever em arquivos
async function handleFileWriting(filePath, newContent, encoding = ENCODING) {
  try {
    // Converte o conteúdo paasado para JSON
    const stringifyContent = JSON.stringify(newContent);
    // Escreve n arquivo o que foi passado
    await writeFile(filePath, stringifyContent, encoding);
  } catch ({ message }) {
    // Mensagem caso algo de errado aconteça
    console.error(`Erro ao escrever o arquivo: ${message}`);
  }
}

// Exportação das funções
module.exports = { handleFileReading, handleFileWriting };