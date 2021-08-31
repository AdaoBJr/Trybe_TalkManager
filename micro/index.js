const fs = require('fs');

const file = './talker.json';

const getTalker = async () => {
    const data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data);
  };

const getTalkerID = async (id) => {
  const data = await getTalker();
  const out = data.find((talker) => talker.id === Number(id));
  return out;
};

module.exports = { getTalker, getTalkerID };