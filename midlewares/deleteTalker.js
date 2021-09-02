const fs = require('fs').promises;

const deleteTalker = async (req, res) => {
    const { id } = req.params;
    const talkersList = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));
    const talkerIndex = talkersList.findIndex((talker) => talker.id === Number(id));
    if (talkerIndex === -1) {
        return res.status(404).json({
        message: 'Pessoa palestrante não encontrada',
        });
    }
    talkersList.splice(talkerIndex, 1);
    await fs.writeFile('./talker.json', JSON.stringify(talkersList));
    return res.status(200).send({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;