const fs = require('fs').promises;

const getAll = () => fs.readFile('./talker.json', 'utf8').then((data) => JSON.parse(data));

const findById = async (idUser) => {
  const data = await getAll();
  return data[+idUser - 1];
};

const create = async (content) => {
  const data = await getAll();
  fs.writeFile('./talker.json', JSON.stringify([...data, content])); 
};

const update = async (talker) => {
  const data = await getAll();
  data[talker.id - 1] = talker;
  create(data);
};

const excluse = async (idUser) => {
  const data = await getAll();
  data.splice(+idUser - 1, 1);
  create(data);
};

const findByName = async (param) => {
  const data = await getAll();
  return data.filter(({ name }) => RegExp(param, 'gi').test(name));
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  excluse,
  findByName,
};
