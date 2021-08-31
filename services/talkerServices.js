const speakersUtil = require('../utils/fs-utils');

const getAllService = async () => {
  const speakers = await speakersUtil.readSpeakers();
  return speakers;
};

module.exports = {
  getAllService,
};
