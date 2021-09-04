const fs = require('fs');

function deleteId(req, res) {
    const { id } = req.params;
      const talkersList = JSON.parse(fs.readFileSync('talker.json'));
      const talker = talkersList.indexOf(id);
      fs.writeFileSync('./talker.json', JSON.stringify(talker));
      return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
}
module.exports = deleteId;