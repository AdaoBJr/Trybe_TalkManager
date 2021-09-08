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

const putTalker = async (id, updatedTalker) => {
    const talkers = await getAllTalkers();
    const indexTalker = talkers.findIndex((r) => r.id === +(id));
    talkers.splice(indexTalker, 1);
    await fs.writeFile(talkerFile, JSON.stringify(talkers));
    const updatedTalkers = await postTalker(updatedTalker);
    return updatedTalkers;
};

const deleteTalker = async (id) => {
    const talkers = await getAllTalkers();
    const indexTalker = talkers.findIndex((r) => r.id === +(id));
    talkers.splice(indexTalker, 1);
    await fs.writeFile(talkerFile, JSON.stringify(talkers));
};

module.exports = { getAllTalkers, getTalker, postTalker, putTalker, deleteTalker };
