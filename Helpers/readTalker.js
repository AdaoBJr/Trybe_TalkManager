const fs = require('fs').promises;

const talker = 'talker.json';

const readTalkerFunc = async () => fs.readFile(talker)
.then((data) => JSON.parse(data))
.catch((err) => err);

module.exports = { readTalkerFunc };