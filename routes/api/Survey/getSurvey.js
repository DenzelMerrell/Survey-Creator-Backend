/*
    Endpoint to search for a single survey by its surveyId
*/

const express = require('express');
const { Survey, User } = require('../../../Models/Models.js');

const router = express.Router();


router.get('/getSurvey', async (req, res) => {
    /*
        req body will contain:
        surveyId

        res will contain:
        An array of surveys, each as an object containing:
            surveyName
            username that the survey pertains to (look into joins for sequelize)
    */

    const { surveyId } = req.body;

    if (!surveyId) {
        res.json({
            success: false,
            message: "Survey id cannot be blank"
        })
    }

    let survey;

    try {

        survey = await Survey.findOne({
            attributes: ["surveyName"],
            where: {
                surveyId: surveyId
            },
            include: {
                model: User,
                attributes: ["username"]
            }
        })
    }
    catch (err) {
        console.log("Server Error: ", err);
        res.json({
            success: false,
            message: "Server Error"
        })
    }

    if (!survey) {
        res.json({
            success: false,
            message: "Survey not found"
        })
    }

    res.json({
        success: true,
        message: "Success",
        survey: survey
    })
})


module.exports = router;