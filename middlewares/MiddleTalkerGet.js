const fs = require('fs').promises;

const palestrantes = async (_req, res) => {
  const response = await fs.readFile('./talker.json', 'utf-8');
  const data = JSON.parse(response);
  
  if (!data) {
    return res.status(200).json({ data: [] });
  }
  
  return res.status(200).json(data);
};

module.exports = {
  palestrantes,
};
