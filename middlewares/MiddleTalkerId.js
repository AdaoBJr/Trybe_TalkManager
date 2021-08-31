const fs = require('fs').promises;

const talkerId = async (req, res) => {
  const { id } = req.params;
  const response = await fs.readFile('./talker.json', 'utf-8');
  const convert = JSON.parse(response);
  const data = convert.find((cur) => cur.id === Number(id));
  
  return res.json(data);
};

module.exports = {
  talkerId,
};
