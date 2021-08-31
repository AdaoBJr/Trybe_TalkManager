const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));

const updateDate = (newData) => fs.writeFileSync('./talker.json', JSON.stringify(newData));

const getAll = () => data;

const findById = (idUser) => data[+idUser - 1];

const create = (user) => updateDate([...data, user]);

const update = (change) => {
  data[change.id - 1] = change;
  updateDate(data);
};

const excluse = (idUser) => {
  data.splice(+idUser - 1, 1);
  updateDate(data);
};

const findByName = (text) => data.filter(({ name }) => RegExp(text, 'gi').test(name));

const lastId = data.length + 1;

module.exports = {
  getAll,
  findById,
  create,
  lastId,
  update,
  excluse,
  findByName,
};
