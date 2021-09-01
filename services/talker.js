const Talker = require('../models/talker');

const create = async (talker) => {
  const data = await Talker.getAll();
  const id = data.length + 1;
  const { ...newTalker } = { id, ...talker };
  await Talker.createTalker(newTalker);
  return newTalker;
};

const update = async (id, talker) => {
  const updateTalker = { id: +id, ...talker };
  await Talker.update(updateTalker);
  return updateTalker;
};

module.exports = {
  getAll: Talker.getAll,
  findById: Talker.findById,
  findByName: Talker.findByName,
  excluse: Talker.excluse,
  create,
  update,
};
