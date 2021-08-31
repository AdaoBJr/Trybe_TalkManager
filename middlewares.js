const authMiddleware = (req, res, next) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!email.match(/\w+@\w+.com/)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    if (!password) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
};

const talkerPostValidator = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (authorization.length !== 16) {
        return res.status(401).json({ message: 'Token inválido' });
    }
    next();
};

const nameAgeValidator = (req, res, next) => {
    const { name, age } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    if (!age) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (Number(age) < 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
};

const talkObjValidator1 = (req, res, next) => {
    const { talk } = req.body;
    if ((!talk || !talk.watchedAt) || (!talk.rate && parseInt(talk.rate, 10) !== talk.rate)) {
        return res.status(400).json(
            { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
            );
    }
    // talk.rate !== 0 foi oq faltava para passar só no req 5, no 4 passava sem ele, oq parece um bug, pois se talk.rate existe, deveria executar o next()
    next();
};

const talkObjValidator2 = (req, res, next) => {
    const { talk } = req.body;

    if (!talk.watchedAt.match(/^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/)) {
        return res.status(400).json(
            { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
            );
    }
    // regex https://qastack.com.br/programming/15491894/regex-to-validate-date-format-dd-mm-yyyy
   
    if (Number(talk.rate) < 1 || Number(talk.rate) > 5) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
};

module.exports = { 
    authMiddleware,
    talkerPostValidator,
    nameAgeValidator,
    talkObjValidator1,
    talkObjValidator2,
};
