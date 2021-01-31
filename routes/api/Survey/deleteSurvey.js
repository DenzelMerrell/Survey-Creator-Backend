/*
    Endpoint to delete a survey
*/

const express = require('express');
const { User, Survey } = require('../../../Models/Models.js');

const router = express.Router();

router.post('/deleteSurvey', async (req, res) => {
    /*
        req body will contain :
        the token
        the id of the survey to delete
    */

    const { token, surveyId } = req.body;

    if (!token) {
        res.json({
            success: false,
            message: "Token cannot be blank"
        })
    }

    if (!surveyId) {
        res.json({
            success: false,
            message: "surveyId cannot be blank"
        })
    }

    //Verify token

    const user = await User.findByPk(token);

    if (!user) {
        res.json({
            success: false,
            message: "User not found"
        })
    }


    const surveyToDel = await Survey.findByPk(surveyId);

    if (!surveyToDel) {
        res.json({
            success: false,
            message: "Survey not found"
        })
    }

    await surveyToDel.destroy();

    // Decrement the numberOfSurveys field in the users table

    user.numberOfSurveys--;

    await user.save();

    res.json({
        success: true,
        message: "Success"
    })
})


module.exports = router;