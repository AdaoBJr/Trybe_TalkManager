const speakersUtil = require('../utils/fs-utils');

const getAllService = async () => {
  const speakers = await speakersUtil.readSpeakers();
  return speakers;
};

const getTalkerById = async (id) => {
  const speakers = await speakersUtil.readSpeakers();
  const talker = speakers.find((item) => item.id === +id);
  return talker;
};

const createTalkerData = async (name, age, talk) => {
const speakers = await speakersUtil.readSpeakers();
const len = speakers.length;
const response = { id: len + 1, age, name, talk };
const newArr = [...speakers, response];
await speakersUtil.writeSpeakers(newArr);
return response;
};

module.exports = {
  getAllService,
  getTalkerById,
  createTalkerData,
};
