const searchForTerm = (data, term) => {
  const object = data.filter((curr) => curr.name.toLowerCase().includes(term));

  return object;
};

module.exports = searchForTerm;
