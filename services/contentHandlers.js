function searchById(database, targetId) {
  const stringToNumber = Number(targetId);

  const findResult = database.find(({ id }) => id === stringToNumber);

  return findResult;
}

function searchByName(database, targetName) {
  const formatString = String(targetName).toLowerCase();

  const filteredResults = database.filter(({ name }) => name.toLowerCase().includes(formatString));

  // console.log('Resultados filtrados:\n', filteredResults, targetName);

  return filteredResults;
}

module.exports = { searchById, searchByName };
