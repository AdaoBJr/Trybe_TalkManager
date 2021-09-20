const fs = require('fs').promises;

async function read(path) {
  try {
      const file = await fs.read(path, 'utf-8');
      return JSON.parse(file);
  } catch (error) { 
    console.log(error);
  }
}

module.exports = read;