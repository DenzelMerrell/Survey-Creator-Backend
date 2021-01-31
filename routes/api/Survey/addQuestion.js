/*
    Endpoint to add a question to a survey 
*/

const express = require('express');
const router = express.Router();

const { Question, Survey } = require('../../../Models/Models.js');

router.post('/addQuestion', async (req, res) => {
    /*
        req body:
        {
            question,
            surveyId
        }
    */

    const { question, surveyId } = req.body;

    if (!question) {
        res.json({
            success: false,
            message: "Question cannot be blank"
        })
    }

    if (!surveyId) {
        res.json({
            success: false,
            message: "surveyId cannot be blank"
        })
    }

    // Verify surveyId

    const survey = await Survey.findByPk(surveyId);

    if (!survey) {
        res.json({
            success: false,
            message: "Survey not found"
        })
    }

    try {
        const newQuestion = Question.build({
            question: `${question}`,
            surveyId: `${surveyId}`
        })

        await newQuestion.save();

        // Increment the numberOfQuestions field in the surveys table

        survey.numberOfQuestions++;

        await survey.save();

        // Send questionId with the response

        const id = newQuestion.questionId;

        res.json({
            success: true,
            message: "Success",
            questionId: `${id}`
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