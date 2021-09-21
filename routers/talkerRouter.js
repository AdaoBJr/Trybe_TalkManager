const express = require('express');

const router = express.Router();
const fs = require('fs').promises;

const talkers = './talker.json';
router.get('/', (_request, response) => {
  let data = [];
  fs.readFile(talkers, 'utf8')
  .then((info) => JSON.parse(info))
  .then((info) => {
    data = info;
    return response.status(200).json(data);
  })
  .catch((e) => {
    response.status(400).json(e);
   });
});

const tokenCheck = (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) {
    return response.status(401).json(
      { message: 'Token não encontrado' },
    );
  }
  if (authorization.length !== 16) {
    return response.status(401).json(
      { message: 'Token inválido' },
    );
  }
  next();
};

router.get('/search', tokenCheck, (req, res) => {
  fs.readFile(talkers, 'utf8')
  .then((info) => JSON.parse(info))
  .then((info) => {
    const { q } = req.query;
    if (!q) return res.status(200).json(info);
    const searchTalker = info.filter((talker) => talker.name.includes(q));
    return res.status(200).json(searchTalker);
  })
  .catch((erro) => { res.status(400).json(erro); });
});

router.get('/:id', (request, response) => {
  const { id } = request.params;

  fs.readFile(talkers, 'utf8')
  .then((info) => JSON.parse(info))
  .then((info) => {
    const filtered = info.find((item) => item.id === Number(id));   
    if (!filtered) {
      return response.status(404).json({
        message: 'Pessoa palestrante não encontrada',
      });
    }
    return response.status(200).json(filtered);
  });
});

const nameCheck = (request, response, next) => {
  const { name } = request.body;
  if (!name || name.length === 0) {
    return response.status(400).json(
      {
        message: 'O campo "name" é obrigatório',
      },
    );
  }
  if (name.length < 3) {
    return response.status(400).json(
      {
        message: 'O "name" deve ter pelo menos 3 caracteres',
      },
    );
  }
  next();
};

const ageCheck = (request, response, next) => {
  const { age } = request.body;
  if (!age || age.length === 0) {
    return response.status(400).json(
      {
        message: 'O campo "age" é obrigatório',
      },
    );
  }
  if (age <= 17) {
    return response.status(400).json(
      {
        message: 'A pessoa palestrante deve ser maior de idade',
      },
    );
  }
  next();
};

const talkCheck = (request, response, next) => {
  const { talk } = request.body;
  if (!talk) {
    return response.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }
  return next();
};

const watchedAtCheck = (request, response, next) => {
  const { talk } = request.body;
  const { watchedAt } = talk;
  const dataRegex = RegExp(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/);
  if (!watchedAt) {
    return response.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }
  if (!dataRegex.test(watchedAt)) {
    return response.status(400).json(
      { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
    );
  }
  next();
};

const rateCheck = (request, response, next) => {
  const { talk } = request.body;
  const { rate } = talk;
  if (rate < 1 || rate > 5) {
    return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
   }
  if (!rate) {
    return response.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }
   next();
};

router.post('/', tokenCheck, nameCheck, ageCheck, talkCheck, watchedAtCheck,
  rateCheck, (req, res) => {
  fs.readFile(talkers, 'utf8')
  .then((info) => JSON.parse(info))
  .then((info) => {
    const data = info;
    const newTalker = {
      ...req.body,
      id: info.length + 1,
    };

    data.push(newTalker);
    fs.writeFile('./talker.json', JSON.stringify(data));
    return res.status(201).json({ ...newTalker });
  })
  .catch((e) => res.status(400).json(e));
});

router.put('/:id',
  tokenCheck, nameCheck, ageCheck, talkCheck, rateCheck, watchedAtCheck, (req, res) => {
    fs.readFile(talkers, 'utf8')
    .then((info) => JSON.parse(info))
    .then((info) => {
      const { id } = req.params;
      const dataFilter = info.filter((talk) => talk.id !== Number(id));
      const edited = {
        ...req.body,
        id: Number(id),
      };
      dataFilter.push(edited);
      const data = dataFilter;
      fs.writeFile('./talker.json', JSON.stringify(data));

      return res.status(200).json(edited);
    })
    .catch((e) => res.status(400).json(e));
  });

  router.delete('/:id', tokenCheck, (req, res) => {
    fs.readFile(talkers, 'utf8')
    .then((info) => JSON.parse(info))
    .then((info) => {
      const { id } = req.params;
      const dataFilter = info.filter((talker) => talker.id !== Number(id));

      const data = dataFilter;
      fs.writeFile('./talker.json', JSON.stringify(data));
      return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
    })
    .catch((erro) => res.status(400).json(erro));
  });

module.exports = router;
