const fs = require('fs').promises;

const getTalkers = async () => JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
const putTalkers = (content) => fs.writeFile('./talker.json', JSON.stringify(content));

module.exports = { getTalkers, putTalkers };
