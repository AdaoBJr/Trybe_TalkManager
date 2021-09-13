const searchOnFile = (array, param) => {
  const item = array.filter((curr) => curr.id !== Number(param));

  return item;
};

module.exports = searchOnFile;
