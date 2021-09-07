const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  const talkers = JSON.parse(fs.readFileSync(`${__dirname}/../talker.json`));
   res.status(200).json(talkers);
});

module.exports = app;
