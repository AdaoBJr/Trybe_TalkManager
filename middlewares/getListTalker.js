const listTalker = require('../services/listTalker');

async function getListTalker(_req, res) {
  const list = listTalker();
  if (!list.length === 0) {
    return res.status(200).send(JSON.parse(list));
  }
  return res.status(200).send([]);
}

module.exports = getListTalker;