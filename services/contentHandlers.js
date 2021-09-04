function searchById(database, targetId) {
  const stringToNumber = Number(targetId);

  const findResult = database.find(({ id }) => id === stringToNumber);

  return findResult;
}

module.exports = { searchById };
