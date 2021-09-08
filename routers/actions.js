const fs = require('fs');

const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));

const updateData = (talker) => fs.writeFileSync('./talker.json', JSON.stringify(talker));

const createTalker = (talker) => updateData([...talkers, talker]);

const updateTalker = (change) => {
  talkers[change.id - 1] = change;
  updateData(talkers);
};

const deleteTalker = (id) => {
  talkers.splice(+id - 1, 1);
  updateData(talkers);
};

module.exports = {
  updateTalker,
  createTalker,
  deleteTalker,
};