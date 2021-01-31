/*
    Endpoint to search for all of the questions pertaining to a survey 
*/
const express = require('express');
const { Question } = require('../../../Models/Models.js');

const router = express.Router();

router.get('/getQuestions', async (req, res) => {
    /*
        req body will contain
        surveyId

        res will contain:
        [
            {
                question: "",
                questionId: id
            },
        ]
    */

    const { surveyId } = req.body;

    if (!surveyId) {
        res.json({
            success: false,
            message: "Survey id cannot be blank"
        })
    }

    let questions;

    try {
        questions = await Question.findAll({
            where: {
                surveyId: `${surveyId}`
            },
            attributes: ['question', 'questionId']
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
            message: "No questions"
        })
    }

    res.json({
        success: true,
        message: "Success",
        questions: questions
    })

})

module.exports = router;