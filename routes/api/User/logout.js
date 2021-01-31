/*
    Logout endpoint for ending the user session associated with the token given
    in the request
*/

const express = require('express');
const { UserSession } = require('../../../Models/Models.js');

const router = express.Router();

router.post('/logout', async (req, res) => {

    //Get the token from the request

    const { token } = req.body;

    //Find the user session associated with that token in the database and end the session
    try {
        const sessions = await UserSession.findAll({
            where: {
                userId: token
            }
        });

        //If the session doesn't exist
        if (sessions.length === 0) {
            res.send({
                success: false,
                message: "Session not found"
            })
        }

        //If there are multiple sessions open (which should never happen)
        if (sessions.length > 1) {
            res.send({
                success: false,
                message: "Error => Server Error"
            })
        }

        const session = sessions[0];

        session.openSession = false;

        await session.save();

    }
    catch (err) {
        console.log("ERROR DELETING USER SESSION: " + err);

        res.send({
            success: false,
            message: "ERROR DELETING USER SESSION: " + err
        })
    }

    res.send({
        success: true,
        message: 'success'
    })

})



module.exports = router;