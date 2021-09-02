const listTalker = require('../services/listTalker');

async function getListTalker(_req, res) {
  const list = await listTalker();
  return res.status(200).json(list);
}

module.exports = getListTalker;