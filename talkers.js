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

const postTalker = async (newTalker) => {
    const talkerFile = './talker.json';
    const talkers = await allTalkers();
    const talk = {
        id: talkers.length + 1,
        ...newTalker,
    };
    talkers.push(talk);
    await fs.writeFile(talkerFile, JSON.stringify(talkers));
    return talk;
};

module.exports = { allTalkers, talker, postTalker };
