/*
    Endpoint to add a survey to a users account 
*/

const express = require('express');
const { Survey, User } = require('../../../Models/Models.js');


const router = express.Router();

router.post('/addSurvey', async (req, res) => {
    /*

        req body should contain:

            Token
            The name of the survey
    */

    const { token, surveyName } = req.body;

    //Verify that there is a token

    if (!token) {
        res.json({
            success: false,
            message: "Error => Token Cannot Be Blank"
        })
    }

    //Verify that the token is correct

    const user = await User.findByPk(token);

    if (!user) {
        res.json({
            success: false,
            message: "Error => Account Not Found"
        })
    }

    try {
        const newSurvey = Survey.build({
            surveyName: `${surveyName}`,
            userId: `${token}`
        })

        await newSurvey.save();


        // Increment numberOfSurveys field in the users table

        user.numberOfSurveys++;

        await user.save();


        // Send response with surveyId

        const id = newSurvey.surveyId;


        res.json({
            successs: true,
            message: "Success",
            surveyId: `${id}`
        })
    }
    catch (err) {
        console.log(`ERROR => Server error ${err}`)
        res.send({
            success: false,
            message: "ERROR => Server error"
        })
    }


})


module.exports = router;