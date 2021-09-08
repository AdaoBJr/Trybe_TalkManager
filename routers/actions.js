const fs = require('fs');

const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));

const updateTalker = (talker) => fs.writeFileSync('./talker.json', JSON.stringify(talker));

const createTalker = (talker) => updateTalker([...talkers, talker]);

module.exports = {
  updateTalker,
  createTalker,
};