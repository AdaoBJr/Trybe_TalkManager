const express = require('express');

const router = express.Router();
const {
    getAll,
    getTalkerID,
    tolkenValidate,
    watchedValidate,
    dateValidate,
    ageValidate,
    nameValidate,
    create,
    rateValidate,
    edit,
    deleteTalker,
} = require('../rota/talker');

router.route('/')
    .get(getAll)
    .post(
            tolkenValidate,
            watchedValidate,
            dateValidate,
            rateValidate,
            nameValidate,
            ageValidate,
            create,
        );

router.route('/:id')
    .get(getTalkerID)
    .put(
        tolkenValidate,
        watchedValidate,
        dateValidate,
        rateValidate,
        nameValidate,
        ageValidate,
        edit,
    )
    .delete(
        tolkenValidate,
        deleteTalker,
    );   

module.exports = router;

// (request, response, next) => {

// }

