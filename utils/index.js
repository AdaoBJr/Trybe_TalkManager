const crypto = require('crypto');
const fs = require('fs').promises;

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

async function readFile(filename) {
  const contentFile = await fs.readFile(filename, 'utf-8')
    .then((content) => JSON.parse(content));
  if (contentFile.length > 0) return contentFile;
  return [];
}

module.exports = {
  readFile,
  generateToken,
};
