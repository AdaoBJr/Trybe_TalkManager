const fs = require('fs').promises;

async function setFileSeed(newUser) {
    await fs.writeFile('./seed.json', JSON.stringify(newUser));
}

module.exports = {
  setFileSeed,
};