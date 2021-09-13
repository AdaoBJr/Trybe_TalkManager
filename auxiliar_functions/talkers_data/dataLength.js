const { readFileSync } = require('fs');

const dataLength = (data) => {
  const size = JSON.parse(readFileSync(data)).length;

  return size;
};

module.exports = dataLength;
