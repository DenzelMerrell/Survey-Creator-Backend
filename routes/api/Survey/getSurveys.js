/*
    Endpoint to search for all surveys by the search query
*/

const express = require('express');
const { Survey, User } = require('../../../Models/Models.js');
const { Op } = require('sequelize');

const router = express.Router();


router.get('/getSurveys', async (req, res) => {
    /*
        req body will contain:
        searchQuery

        res will contain:
        An array of surveys, each as an object containing:
            surveyName
            surveyId 
            username that the survey pertains to (look into joins for sequelize)
    */

    const { searchQuery } = req.body;

    if (!searchQuery) {
        res.json({
            success: false,
            message: "Search query cannot be blank"
        })
    }

    let surveys;

    try {

        surveys = await Survey.findAll({
            attributes: ["surveyName", "surveyId"],
            where: {
                surveyName: {
                    [Op.like]: `%${searchQuery}%`
                }
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

    res.json({
        success: true,
        message: "Success",
        surveys: surveys
    })
})


module.exports = router;