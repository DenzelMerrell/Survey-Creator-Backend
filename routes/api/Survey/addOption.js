/*
    Endpoint for adding an option to a question
*/

const express = require('express');
const router = express.Router();

const { Option, Question } = require('../../../Models/Models.js');

router.post('/addOption', async (req, res) => {
    /*
        req body should contain:
        option,
        questionId
    */

    const { option, questionId } = req.body;

    if (!option) {
        res.json({
            success: false,
            message: "option cannot be blank"
        })
    }

    if (!questionId) {
        res.json({
            success: false,
            message: "question cannot be blank"
        })
    }

    // Verify questionId

    const question = await Question.findByPk(questionId);

    if (!question) {
        res.json({
            success: false,
            message: "Question not found"
        })
    }

    try {

        const newOption = Option.build({
            option: `${option}`,
            questionId: `${questionId}`
        })

        await newOption.save();

        // Increment the numberOfOptions field in the questions table

        question.numberOfOptions++;

        await question.save();


        res.json({
            success: true,
            message: "success"
        })

    }
    catch (err) {
        console.log(`Server Error: ${err}`);
        res.json({
            success: false,
            message: "Server Error"
        })
    }

})

module.exports = router;