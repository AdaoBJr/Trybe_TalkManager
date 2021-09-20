const read = require('../connection/read');

const getTalkers = async (_req, res) => {
  const file = await read('../../talker.json');
  console.log(file);
  if (!file) {
    return res.status(200).send([]);
  }
  return res.status(200).json(file);
};

module.exports = {
  getTalkers,
}; 