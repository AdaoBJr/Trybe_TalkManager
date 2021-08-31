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

module.exports = {
  getAllService,
  getTalkerById,
};
