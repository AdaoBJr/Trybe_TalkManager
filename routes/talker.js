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
} = require('../micro/talker');

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
    );   

module.exports = router;

// (request, response, next) => {
            
// }