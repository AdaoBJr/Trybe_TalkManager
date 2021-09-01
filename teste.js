const teste = [
  {
    name: 'Henrique Albuquerque',
    age: 62,
    id: 1,
    talk: {
      watchedAt: '23/10/2020',
      rate: 5,
    },
  },
  {
    name: 'Heloísa Albuquerque',
    age: 67,
    id: 2,
    talk: {
      watchedAt: '23/10/2020',
      rate: 5,
    },
  },
  {
    name: 'Ricardo Xavier Filho',
    age: 33,
    id: 3,
    talk: {
      watchedAt: '23/10/2020',
      rate: 5,
    },
  },
  {
    name: 'Marcos Costa',
    age: 24,
    id: 4,
    talk: {
      watchedAt: '23/10/2020',
      rate: 5,
    },
  },
];

const talkerToEdit = teste.findIndex((t) => t.id === Number(id));

console.log(talkerToEdit);

const editedTalker = {id}
