const fs = require('fs').promises;

module.exports = async (_req, res) => {
  const content = await fs.readFile('./talker.json', 'utf-8');
  if (content.length === 0) {
    return res.status(200).json([]);
  }
  const contentInJSON = JSON.parse(content);
  return res.status(200).json(contentInJSON);
};
