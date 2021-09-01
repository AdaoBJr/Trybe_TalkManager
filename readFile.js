const fs = require('fs').promises;

const getAllTalkers = async () => {
    const talkerFile = './talker.json';
    const talkers = await fs.readFile(talkerFile);
    return JSON.parse(talkers);
};

const getTalker = async (id) => {
    const talkerFile = './talker.json';
    const talkers = JSON.parse(await fs.readFile(talkerFile));
    const talker = talkers.find((r) => r.id === +(id));
    return talker;
};

module.exports = { getAllTalkers, getTalker };
