const fs = require('fs').promises;
const path = require('path');

class IoConnection {
  constructor() {
     this.io = fs;
     this.talkerDir = path.join(__dirname, '..', 'talker.json');
  }

  async getAll() {
    const file = await this.io.readFile(this.talkerDir, 'utf-8');
    const parsedFile = await JSON.parse(file);
    return parsedFile;
  }

  async search(query) {
    const users = await this.getAll();
    if (!query) return users;
    const foundUsers = users.filter((user) => user.name.includes(query));
    return foundUsers;
  }

  async getById(id) {
    const users = await this.getAll();
    const foundUser = users.find((user) => Number(id) === Number(user.id));
    if (!foundUser) throw new Error('Pessoa palestrante não encontrada');
    return foundUser;
  }

  async delete(id) {
    const users = await this.getAll();
    const indexUser = users.findIndex((el) => Number(el.id) === Number(id));
    users.splice(indexUser, 1);
    const stringfiedFile = JSON.stringify(users);
    await fs.writeFile(this.talkerDir, stringfiedFile, 'utf-8');
  }

  async create(body) {
    const user = body;
    const users = await this.getAll();
    const newId = users[users.length - 1].id + 1;
    user.id = newId;
    users.push(user);
    const stringfiedFile = JSON.stringify(users);
    await fs.writeFile(this.talkerDir, stringfiedFile, 'utf-8');
  }

  async update(body, id) {
    const user = body;
    const users = await this.getAll();
    const indexUser = users.findIndex((el) => Number(el.id) === Number(id));
    user.id = indexUser + 1;
    users[indexUser] = user;
    const stringfiedFile = JSON.stringify(users);
    await fs.writeFile(this.talkerDir, stringfiedFile, 'utf-8');
  }
}

module.exports = IoConnection;