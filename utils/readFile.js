const fs = require('fs').promises;

async function readFile(path) {
  try {
      const file = await fs.readFile(path, 'utf8');
      return JSON.parse(file);
  } catch (error) { 
    console.log(error);
  }
}

module.exports = readFile;