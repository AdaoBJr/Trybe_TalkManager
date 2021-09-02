const fs = require('fs').promises;

const insertTalker = (data) => fs.writeFile('./talker.json', JSON.stringify(data));

module.exports = { insertTalker };