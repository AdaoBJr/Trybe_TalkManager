const fs = require('fs').promises;

const path = './talker.json';

const searchTalkerByName = async (req, res) => {
  const data = await fs.readFile(path, 'utf8');
  const talkersData = JSON.parse(data);
  const lookingFor = req.query.q;  
  if (lookingFor) {
    const filteredNames = talkersData.filter(({ name }) => name.includes(lookingFor));
    return res.status(200).json(filteredNames);
  }
  res.status(200).json(talkersData);
};

module.exports = searchTalkerByName;
