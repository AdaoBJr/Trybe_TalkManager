const fs = require('fs').promises;

const talkerFile = './talker.json';

const getTalkerData = async () => JSON.parse(await fs.readFile(talkerFile, 'utf-8'));

const addTalkerData = async (dataToAdd) => {
    const talkerData = await getTalkerData();

    const id = talkerData.length + 1;
    const newTalker = { ...dataToAdd, id };
    
    talkerData.push((newTalker));
    await fs.writeFile(talkerFile, JSON.stringify(talkerData));
    return newTalker;
};

const findTalkerById = async (id) => {
    const numberId = Number(id);
    const talkerData = await getTalkerData();
    return talkerData.find((talker) => talker.id === numberId);
};

const editTalkerById = async (reqBody, id) => {
    const numberId = Number(id);
    const talkerData = await getTalkerData();
    const talkerToEdit = { ...reqBody, id: numberId };
    const updatedTalkers = talkerData.map((talker) => 
        (talker.id === numberId ? talkerToEdit : talker));
    await fs.writeFile(talkerFile, JSON.stringify(updatedTalkers));
    return talkerToEdit;
};

const deleteTalkerById = async (id) => {
    const numberId = Number(id);
    const talkerData = await getTalkerData();
    talkerData.forEach((talker, index) => 
    (talker.id === numberId ? talkerData.splice(index, 1) : null));
    await fs.writeFile(talkerFile, JSON.stringify(talkerData));
};

const searchTalkerByQuery = async (query) => {
    const talkerData = await getTalkerData();
    if (!query || query === '') { return talkerData; }
    const newTalkerData = talkerData.filter((talker) => talker.name.includes(query));
    return newTalkerData;
};

const generateRandomToken = () => {
    let token = '';
    const stringLength = 16;
    const stringArray = ['0', '1', '2', '3', '4', '5', '6', 
    '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 
    't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 
    'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!', '?'];

    for (let index = 0; index < stringLength; index += 1) {
        const strArrayNumber = Math.ceil((Math.random() * stringArray.length) - 1);
        token += stringArray[strArrayNumber];
    }
    return token;
    // source https://jsfiddle.net/brightmatrix/a8tpLun0/
};

module.exports = { 
    getTalkerData,
    addTalkerData,
    findTalkerById,
    generateRandomToken,
    editTalkerById,
    deleteTalkerById,
    searchTalkerByQuery,
};
