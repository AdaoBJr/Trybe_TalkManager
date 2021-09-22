const fs = require('fs').promises;

const allTalkers = async () => {
    const talkerFile = './talker.json';
    const talkers = await fs.readFile(talkerFile);
    return JSON.parse(talkers);
};

const talker = async (id) => {
    const talkerFile = './talker.json';
    const talkers = JSON.parse(await fs.readFile(talkerFile));
    const idTalker = talkers.find((response) => response.id === +(id));
    return idTalker;
};

module.exports = { allTalkers, talker };
