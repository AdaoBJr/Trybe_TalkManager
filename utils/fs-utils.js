const fs = require('fs/promises');

exports.readSpeakers = () => fs.readFile('./talker.json', 'utf-8').then((res) => JSON.parse(res));

exports.writeSpeakers = (data) => fs.writeFile('./talker.json', JSON.stringify(data));
