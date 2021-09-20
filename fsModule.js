const fs = require('fs').promises;

// const talkers = async () => {
//   const talkersJson = await fs.readFile('./talker.json', 'utf-8');
//   return JSON.parse(talkersJson);
// };

// const getAllTalkers = talkers();

const getAllTalkers = async () => {
  const talkersJson = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(talkersJson);
};

const writeNewTalker = async (talker) => {
  let newTalkersList = null;
  getAllTalkers()
  .then((result) => {
    newTalkersList = result;
    newTalkersList.push(talker);
    fs.writeFile('./talker.json', JSON.stringify(newTalkersList));
  })
  .catch((err) => console.log(err));
};

const writeUpdatedTalkers = (updatedTalkers) =>
  fs.writeFile('./talker.json', JSON.stringify(updatedTalkers));

module.exports = {
  getAllTalkers,
  writeNewTalker,
  writeUpdatedTalkers,
};