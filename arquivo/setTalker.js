const { getTalker } = require('./getTalker');

  async function setTalker(value, res) {
    const content = (await getTalker());
    content.push(value);
    return res.status(200).json(value);
}

module.exports = { setTalker };
