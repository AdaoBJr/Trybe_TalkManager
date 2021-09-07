const fs = require('fs').promises;
const express = require('express');

const Talker = express.Router();

const HTTP_OK_STATUS = 200;

const OldDB = async () => {
  const DB = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(DB);
};

Talker.get('/', async (req, res) => {
  const DB = await OldDB();
  return res.status(HTTP_OK_STATUS).send(DB);
});
