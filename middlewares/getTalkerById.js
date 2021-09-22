const readFile = require('../utils/readFile');

const getTalkerById = async (req, res) => {
    const { id } = req.params;
    const file = await readFile('./talker.json');
    const idResult = file.find((object) => object.id === parseInt(id, 10));
    console.log(idResult);
    if (!idResult) {
      return res.status(404).json({
        message: 'Pessoa palestrante não encontrada',
      });
    } res.status(200).json(idResult);
   };

module.exports = getTalkerById;
