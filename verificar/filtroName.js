const { getTalker } = require('../arquivo/getTalker');

async function filtroName(req, res) {
    const { q } = req.query;
    const talkers = (await getTalker());
    if (!q) return res.status(200).json(talkers);
    const selectedTalkers = talkers.filter((talker) => talker.name.includes(q));
    return res.status(200).json(selectedTalkers);
}

module.exports = { filtroName };