const fs = require('fs').promises;

const readAllTalkers = (_req, res) => fs.readFile('./talker.json', 'utf8')
    .then((content) => res.status(200).send(JSON.parse(content)))
    .catch((err) => res.status(401)
    .json({ message: `Unable to read file... Error ${err.message}` }));

module.exports = readAllTalkers;
