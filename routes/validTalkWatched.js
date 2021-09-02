const isValidTalkWatchedAt = (req, res, next) => {
    const regexData = RegExp(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/);
    const { talk } = req.body;
  
    if (!talk || !talk.watchedAt || talk.rate === undefined) { 
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
    }
  
    if (!regexData.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
    };
module.exports = { isValidTalkWatchedAt };