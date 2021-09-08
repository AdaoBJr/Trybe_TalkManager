const express = require('express');

const router = express.Router();
const {
    getAll,
    getTalkerID,
    tolkenValidate,
    ageValidate,
    nameValidate,
    create,
} = require('../micro/talker');

router.route('/')
    .get(getAll)
    .post(
        (request, response, next) => {
            tolkenValidate(request, response, next);
        },
        (request, response, next) => {
            const { talk } = request.body;
            if (talk === undefined || talk.watchedAt === undefined || talk.rate === undefined) {
                return response
                .status(400)
                .json({ 
                    message: 
                    'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
                });
            }
            next();
        },
        (request, response, next) => {
            const { talk } = request.body;
            // https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy
            const dataFormat = /^[0-9]{2}[/][0-9]{2}[/][0-9]{4}$/;
            if (!dataFormat.test(talk.watchedAt)) {
                return response
                        .status(400)
                        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
            }
         
            next();
        },
        (request, response, next) => {
            const { talk } = request.body;
            if (talk.rate < 1 || talk.rate > 5) {
                return response
                .status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
            }
            next();
        },
        (request, response, next) => {
            nameValidate(request, response, next);
        },
        (request, response, next) => {
            ageValidate(request, response, next);
        },
        async (request, response, next) => {
            await create(request, response, next);
        },

        // tolkenValidate,
        // nameValidate,s
        // ageValidate,
        // create,
        );

router.route('/:id')
    .get(getTalkerID);    

module.exports = router;

// (request, response, next) => {
            
// }