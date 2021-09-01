const fs = require('fs').promises;
const { getTalker } = require('./getTalker');

const talker = 'talker.json';
const n = {
    name: 'Danielle Santos',
    age: 56,
    talk: {
      watchedAt: '22/10/2019',
      rate: 5,
    },
  };
  async function getT(n1) {
    const content = (await getTalker());
    return content;
}

console.log(getT(n));
