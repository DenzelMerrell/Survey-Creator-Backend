/*
    Endpoint to search for all of the options pertaining to a question 
*/
const express = require('express');
const { Option } = require('../../../Models/Models.js');

const router = express.Router();

router.get('/getOptions', async (req, res) => {
    /*
        req body will contain
        questionId

        res will contain:
        [
            {
                option: "",
                optionId: id
            },
        ]
    */

    const { questionId } = req.body;

    if (!questionId) {
        res.json({
            success: false,
            message: "Question id cannot be blank"
        })
    }

    let options;

    try {
        options = await Option.findAll({
            where: {
                questionId: `${questionId}`
            },
            attributes: ['option', 'optionId']
        })
    }
    catch (err) {
        console.log("Error: ", err);

        res.json({
            success: false,
            message: "Server Error"
        })
    }

    if (questions.length <= 0) {
        res.json({
            success: false,
            message: "No options"
        })
    }

    res.json({
        success: true,
        message: "Success",
        options: options
    })

})

module.exports = router;