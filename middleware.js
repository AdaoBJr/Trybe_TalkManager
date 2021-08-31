const fs = require('fs');

const talkers = './talker.json';

const getTalker = async () => {
    const data = fs.readFileSync(talkers, 'utf8');
    return JSON.parse(data);
};

module.exports = {
  getTalker,
};
