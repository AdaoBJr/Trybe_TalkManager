const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));

const updateDate = (newData) => fs.writeFileSync('./talker.json', JSON.stringify(newData));

const getAll = () => data;

const getOne = (idUser) => data[+idUser - 1];

const setUser = (user) => updateDate([...data, user]);

const changeUser = (change) => {
  data[change.id - 1] = change;
  updateDate(data);
};

const deleteUser = (idUser) => {
  data.splice(+idUser - 1, 1);
  updateDate(data);
};

const searchUser = (text) => data.filter(({ name }) => RegExp(text, 'gi').test(name));

const lastId = data.length + 1;

module.exports = {
  getAll,
  getOne,
  setUser,
  lastId,
  changeUser,
  deleteUser,
  searchUser,
};
