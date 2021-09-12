const fs = require('fs').promises;

const getTalkersList = async () => {
    const talkerJSON = './talker.json';
    const allTalkers = await fs.readFile(talkerJSON);
    return JSON.parse(allTalkers);
};

const getTalkerById = async (id) => {
    const talkerJSON = './talker.json';
    const allTalkers = JSON.parse(await fs.readFile(talkerJSON));
    const talkerById = allTalkers.find((r) => r.id === +(id));
    return talkerById;
};

const addTalker = async (talker) => {
  const talkerJSON = './talker.json';
  const allTalkers = await getTalkersList();
  const newTalker = {
      id: allTalkers.length + 1,
      ...talker,
  };
  allTalkers.push(newTalker);
  await fs.writeFile(talkerJSON, JSON.stringify(allTalkers));
  return newTalker;
};

const updateTalker = async (id, updatedTalker) => {
  const talkerJSON = './talker.json';
  const allTalkers = await getTalkersList();
  const indexTalker = allTalkers.findIndex((r) => r.id === +(id));

  allTalkers.splice(indexTalker, 1);
  await fs.writeFile(talkerJSON, JSON.stringify(allTalkers));

  const updatedTalkers = await addTalker(updatedTalker);
  return updatedTalkers;
};

module.exports = { getTalkersList, getTalkerById, addTalker, updateTalker };
