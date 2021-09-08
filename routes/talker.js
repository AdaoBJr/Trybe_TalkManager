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
    search,
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

router.route('/search')
        .get(
            tolkenValidate,
            search
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