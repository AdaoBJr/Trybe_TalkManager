// Validação do Token (Gabarito Course!)

const isValidToken = (req, res, next) => {
    const token = req.headers.authorization;
    const tokenRegex = /^[a-zA-Z0-9]{16}$/;
    
    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (!tokenRegex.test(token)) {
        return res.status(401).json({ message: 'Token inválido' });
      }
    
      next();
    };

const isValidName = (req, res, next) => {
        const { name } = req.body;

        if (!name || name === '') {
            return res.status(400).json({ message: 'O campo "name" é obrigatório' });
        }
        if (name.length < 3) {
            return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
        }
        
          next();
        };

const isValidAge = (req, res, next) => {
            const { age } = req.body;
    
            if (!age) {
                return res.status(400).json({ message: 'O campo "age" é obrigatório' });
            }
            if (age < 18) {
                return res.status(400).json(
                    { message: 'A pessoa palestrante deve ser maior de idade' },
                    );
            }
            
              next();
            };

            const isValidTalk = (req, res, next) => {
                const { talk } = req.body;
            
                if (!talk) {
                    return res.status(400).json({ message: 
                        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
                    });
                }

                next();
            };
            
const isValidDate = (req, res, next) => {
    const validDat = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
    const { talk } = req.body;
    const { watchedAt } = talk;
    if (!watchedAt || watchedAt === '') {
    return res.status(400).json(
        {
         message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
            },
        );
                }    
                        if (!validDat.test(watchedAt)) {
                            return res.status(400).json(
                                { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
                                );
                        }
                          next();
                        };

            const isValidRate = (req, res, next) => {
                const { talk } = req.body;
                const { rate } = talk;
            
                if ((rate < 1 || rate > 5)) {
                    return res.status(400).json(
                        { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
                        );
                }
                  next();
            };
            
            const isValidWatchAndDate = (req, res, next) => {
                const { talk } = req.body;
                const { watchedAt, rate } = talk;
            
                if ((!watchedAt || watchedAt === '') || (!rate || rate === '')) {
                    return res.status(400).json({ message: 
                        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
                    });
                }
                next();
            };
    
module.exports = { 
    isValidToken, 
    isValidName,
     isValidAge,
      isValidDate, 
      isValidRate, 
      isValidWatchAndDate,
      isValidTalk,
    };
