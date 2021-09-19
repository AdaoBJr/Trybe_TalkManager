// 1 - Crie o endpoint GET /talker
const fs = require('fs').promises;

const PATH = './talker.json';

module.exports = (_req, res, _next) => {
  // console.log('consegui?');
  fs.readFile(PATH, 'utf8')
    .then((data) => {
      if (data === []) {
        return res.status(200).json([]);
      }
        return res.status(200).json(JSON.parse(data));
    })
    .catch((err) => {
      console.error(err);
      // process.exit(1);
    });
};
