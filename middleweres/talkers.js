const fs = require('fs');

const file = './talker.json';
const OK_STATUS = 200;

// const getTalkers = async () => {
//   const data = fs.readFile(file, 'utf-8');
//   const talkers = await JSON.parse(data);

//   return talkers;
// };

const getTalkers = () => {
  fs.readFile(file, (err, data) => {
    if (err) {
      return null;
    }
    return data;
  });
};

const getAllTalkers = async (_req, res) => {
  const talkers = await getTalkers();
  if (!talkers.length) {
    return res.status(OK_STATUS).send([]);
  }
  return res.status(OK_STATUS).json(talkers);
};

module.exports = {
  getAllTalkers,
};
