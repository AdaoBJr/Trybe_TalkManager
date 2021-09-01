const fs = require('fs').promises;

async function readData(_req, res) {
    const data = await fs.readFile('talker.json', 'utf-8');
    const dataJson = JSON.parse(data);

    if (!dataJson) {
        return res.status(200).json({ talkers: [] });
    }

    return res.status(200).json(dataJson);
}

async function filterTalkerId(req, res) {
    const { id } = req.params;
    const data = await fs.readFile('talker.json', 'utf-8');
    const dataJson = JSON.parse(data);
    const talkerFilter = dataJson.find((talker) => talker.id === Number(id));

    if (!talkerFilter) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    return res.status(200).json(talkerFilter);
}

module.exports = {
    readData,
    filterTalkerId,
};