const express = require('express');

const { containEmail, formatEmail, containPass, formatPass } = require('../micro/login');

const router = express.Router();

router.route('/')
    .post(          
        containEmail, 
        formatEmail, 
        containPass, 
        formatPass, 
        (_request, response) => 
            response.status(200).json({ token: '7mqaVRXJSp886CGr' }),
);

module.exports = router;