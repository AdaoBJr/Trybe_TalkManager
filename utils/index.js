const fs = require('fs').promises;

async function readFile(filename) {
  const contentFile = JSON.parse(await fs.readFile(filename, 'utf-8'));
  if (contentFile.length > 0) return contentFile;
  return [];
}

module.exports = {
  readFile,
};
