/*
    Increments the vote count of the poll option after someone takes a survey
*/

const express = require('express');
const { Option } = require('../../../Models/Models.js');

const router = express.Router();


router.post('/vote', async (req, res) => {

    /*
        req body will contain
        optionId
    */

    const { optionId } = req.body

    if (!optionId) {
        res.json({
            success: false,
            message: "Option id cannot be blank"
        })
    }

    let option;

    try {
        option = await Option.findByPk(optionId);
    }
    catch (err) {
        console.log(`Server Error: ${err}`);
        res.json({
            success: false,
            message: "Server Error"
        })
    }

    if (!optionId) {
        res.json({
            success: false,
            message: "Option not found"
        })
    }

    option.numberOfVotes++;

    option.save();

    res.json({
        success: true,
        message: "Success",
    })
})

module.exports = router;