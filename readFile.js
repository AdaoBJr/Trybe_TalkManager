const fs = require('fs').promises;

const talkerJSON = './talker.json';

const getTalkersList = async () => {
    const talkersList = await fs.readFile(talkerJSON);
    return JSON.parse(talkersList);
};

const getTalkerById = async (id) => {
    const talkersList = JSON.parse(await fs.readFile(talkerJSON));
    const talkerById = talkersList.find((r) => r.id === +(id));
    return talkerById;
};

const filterTalkersByName = async (filter) => {
  const allTalkers = await getTalkersList();
  const filteredTalkers = allTalkers.filter((talker) => (
       talker.name.toLowerCase().includes(filter.toLowerCase())
  ));
  await fs.writeFile(talkerJSON, JSON.stringify(filteredTalkers));
  return filteredTalkers;
};

const addTalker = async (talker) => {
  const talkersList = await getTalkersList();
  const newTalker = {
      id: talkersList.length + 1,
      ...talker,
  };
  talkersList.push(newTalker);
  await fs.writeFile(talkerJSON, JSON.stringify(talkersList));
  return newTalker;
};

const updateTalker = async (id, updatedTalker) => {
  const talkersList = await getTalkersList();
  const indexTalker = talkersList.findIndex((r) => r.id === +(id));

  talkersList.splice(indexTalker, 1);
  await fs.writeFile(talkerJSON, JSON.stringify(talkersList));

  const updatedTalkers = await addTalker(updatedTalker);
  return updatedTalkers;
};

const excludeTalker = async (id) => {
  const talkersList = await getTalkersList();
  const indexTalker = talkersList.findIndex((r) => r.id === +(id));
  talkersList.splice(indexTalker, 1);
  await fs.writeFile(talkerJSON, JSON.stringify(talkersList));
};

module.exports = {
  getTalkersList,
  getTalkerById,
  addTalker,
  updateTalker,
  excludeTalker,
  filterTalkersByName,
};
