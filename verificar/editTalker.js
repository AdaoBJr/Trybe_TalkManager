const fs = require('fs');

async function editTalker(req, res) {
      const { id } = req.params;
      const { name, age, talk } = req.body;
      const talkersList = JSON.parse(fs.readFileSync('talker.json'));
      const talker = talkersList.findIndex((item) => +item.id === +id);
      talkersList[talker] = { ...talkersList[talker], name, age, talk };
      fs.writeFileSync('./talker.json', JSON.stringify(talkersList));
      return res.status(200).json(talkersList[talker]);
}

module.exports = { editTalker };