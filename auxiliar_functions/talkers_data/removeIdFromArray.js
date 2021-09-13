const removeIdFromArray = (array, id) => {
  const item = array.filter((curr) => curr.id !== Number(id));

  return item;
};

module.exports = removeIdFromArray;
