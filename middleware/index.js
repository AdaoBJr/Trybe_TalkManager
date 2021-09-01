const fs = require('fs').promises;

async function readdata(_req, res) {
    const data = await fs.readFile('talker.json', 'utf-8');
    const dataJson = JSON.parse(data);

    if (!dataJson) {
        return res.status(200).json({ talkers: [] });
    }

    return res.status(200).json(dataJson);
}

module.exports = {
    readdata,
};