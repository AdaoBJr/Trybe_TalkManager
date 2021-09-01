const fs = require('fs').promises;
// const { validate } = require('./Validade');

const talkerSearch = async (req, res) => {
  const { query: { q } } = req;

  // validate(token, res);
 
  const response = await fs.readFile('./talker.json', 'utf-8');
  const convert = JSON.parse(response);
  
  const filterQuery = convert.filter((cur) => cur.name.includes(q));
  if (filterQuery) {
    return res.status(200).json(filterQuery);
  }
  if (!q) {
    return res.status(200).json(response);
  }
  if (!filterQuery) {
    return res.status(200).json([]);
  }
};

module.exports = {
  talkerSearch,
};