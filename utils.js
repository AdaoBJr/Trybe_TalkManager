const fs = require('fs');

const TALKER_JSON_PATH = 'talker.json';

function readTalkerFile() {
  const contentFile = fs.readFileSync(TALKER_JSON_PATH, 'utf-8');
  return JSON.parse(contentFile);
}

module.exports = {
  readTalkerFile,
};
