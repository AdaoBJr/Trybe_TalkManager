function searchById(database, targetId) {
  const stringToNumber = Number(targetId);
  const findResult = database.find(({ id }) => id === stringToNumber);

  return findResult;
}

function updateContentById(database, targetId) {
  const stringToNumber = Number(targetId);

  const updatedContent = database.filter(({ id }) => Number(id) !== stringToNumber);

  return updatedContent;
}

module.exports = { searchById, updateContentById };
