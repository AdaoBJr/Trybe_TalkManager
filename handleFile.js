const fs = require('fs').promises;

const getTalkers = async () => {
  const talkers = await fs.readFile('./talker.json');
  return JSON.parse(talkers);
};

const filterTalker = async (talkerID) => {
  const talkers = await getTalkers();
  const talker = talkers.find(({ id }) => id === parseInt(talkerID, 10));
  return talker;
};

const setTalkers = async (content) => {
  const talkers = await getTalkers();
  const newTalker = { ...content, id: talkers.length + 1 };
  talkers.push(newTalker);
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
  return newTalker;
};

const editTalker = async (talkerID, body) => {
  const talkers = await getTalkers();
  const index = talkers.findIndex(({ id }) => id === parseInt(talkerID, 10));
  const talker = talkers.find(({ id }) => id === parseInt(talkerID, 10));
  const editedTalker = ({ ...talker, ...body });
  talkers.splice(index, 1);
  talkers.push(editedTalker);
  talkers.sort((a, b) => {
    if (a.id > b.id) {
      return 1;
    }
    if (a.id < b.id) {
      return -1;
    }
    return 0;
  });
  await fs.writeFile('./talker.json', JSON.stringify(talkers));

  return editedTalker;
};

module.exports = { getTalkers, filterTalker, setTalkers, editTalker };
