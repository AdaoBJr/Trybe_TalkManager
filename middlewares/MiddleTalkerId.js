const fs = require('fs').promises;

const talkerId = async (req, res) => {
  const { id } = req.params;
  const response = await fs.readFile('./talker.json', 'utf-8');
  const convert = JSON.parse(response);
  const data = convert.find((cur) => cur.id === Number(id));
  if (!data) {
    return res.status(200).json({ message: 'Pessoa palestrante não encontrada' });
  }
  
  return res.status(200).json(data);
};

module.exports = {
  talkerId,
};
