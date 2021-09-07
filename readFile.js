const fs = require('fs').promises;

const talkerFile = './talker.json';

const getAllTalkers = async () => {
    const talkers = await fs.readFile(talkerFile);
    return JSON.parse(talkers);
};

const getTalker = async (id) => {
    const talkers = JSON.parse(await fs.readFile(talkerFile));
    const talker = talkers.find((r) => r.id === +(id));
    return talker;
};

const postTalker = async (newTalker) => {
    const talkers = await getAllTalkers();
    const talker = {
        id: talkers.length + 1,
        ...newTalker,
    };
    talkers.push(talker);
    await fs.writeFile(talkerFile, JSON.stringify(talkers));
    return talker;
};

module.exports = { getAllTalkers, getTalker, postTalker };
