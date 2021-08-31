const fs = require('fs').promises;

const talker = 'talker.json';

const getTalker = async () => {
    const content = await fs.readFile(talker, 'utf-8');
    return JSON.parse(content);
  };

module.exports = { getTalker };
