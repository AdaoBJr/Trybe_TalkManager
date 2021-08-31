const { getAllService } = require('../services/talkerServices');

const getAllTalkers = async (req, res) => {
  const speakers = await getAllService();
  if (!speakers.length) {
    return res.status(200).json([]);
  }
  return res.status(200).json(speakers);
};

module.exports = {
  getAllTalkers,
};
