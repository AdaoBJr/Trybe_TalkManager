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

const updateTalkerData = async (name, age, talk, id) => {
  const speakers = await speakersUtil.readSpeakers();
  const talker = speakers.find((item) => item.id === +id);
  const response = { ...talker, age, name, talk };
  const newArr = [...speakers, response];
  await speakersUtil.writeSpeakers(newArr);
  return response;
};

const deleteTalkerData = async (id) => {
  const speakers = await speakersUtil.readSpeakers();
  const talker = speakers.find((item) => item.id === +id);
  await speakersUtil.writeSpeakers(talker);
};

const searchTalkerData = async (query) => {
  const speakers = await speakersUtil.readSpeakers();
  if (!query) return speakers;
  const newArr = speakers.filter((item) => item.name.includes(query)) || [];
  return newArr;
};

module.exports = {
  getAllService,
  getTalkerById,
  createTalkerData,
  updateTalkerData,
  deleteTalkerData,
  searchTalkerData,
};
