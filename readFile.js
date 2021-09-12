const fs = require('fs').promises;

const getAllTalkers = async () => {
    const talkerJSON = './talker.json';
    const allTalkers = await fs.readFile(talkerJSON);
    return JSON.parse(allTalkers);
};

const getTalkerById = async (id) => {
    const talkerJSON = './talker.json';
    const allTalkers = JSON.parse(await fs.readFile(talkerJSON));
    const talkerById = allTalkers.find((r) => r.id === +(id));
    return talkerById;
};

module.exports = { getAllTalkers, getTalkerById };
