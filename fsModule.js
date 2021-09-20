const fs = require('fs').promises;

const talkers = async () => {
  const talkersJson = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(talkersJson);
};

const getAllTalkers = talkers();

const writeNewTalker = async (talker) => {
  let newTalkersList = null;
  talkers()
  .then((result) => {
    newTalkersList = result;
    newTalkersList.push(talker);
    fs.writeFile('./talker.json', JSON.stringify(newTalkersList));
  })
  .catch((err) => console.log(err));
};

const writeUpdatedTalkers = (updatedTalkers) => {
  return fs.writeFile('./talker.json', JSON.stringify(updatedTalkers));
};

module.exports = {
  getAllTalkers,
  writeNewTalker,
  writeUpdatedTalkers,
};