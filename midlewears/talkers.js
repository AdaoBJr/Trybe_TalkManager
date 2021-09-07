const fs = require('fs');
const { join } = require('path');

const filePath = join('talker.json');

const getTalkers = () => {
  const data = fs.existsSync(filePath)
    ? fs.readFileSync(filePath)
    : [];
  try {
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveTalker = (talkers) => {
  fs.writeFileSync(filePath, JSON.stringify(talkers, null, '\t'));
};

module.exports = {
  getTalkers,
  saveTalker,
};