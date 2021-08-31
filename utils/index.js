const fs = require('fs').promises;

async function readFile(filename) {
  const contentFile = await fs.readFile(filename, 'utf-8')
    .then((content) => JSON.parse(content));
  if (contentFile.length > 0) return contentFile;
  return [];
}

module.exports = {
  readFile,
};
