/*
    Route to delete an entire user account

*/

const express = require('express');
const { User, UserSession, Survey, Question, Option } = require('../../../Models/Models.js');

const router = express.Router();

router.post('/deleteUser', async (req, res) => {
    /*
        req body will contain:
        token
    */

    const { token } = req.body;

    //Find and delete user

    const user = await User.findByPk(token);

    if (!user) {
        res.json({
            success: false,
            message: "User not found"
        })
    }

    try {
        await user.destroy();

        res.json({
            success: true,
            message: "Success"
        })
    }
    catch (err) {
        console.log("Error: ", err);
        res.json({
            success: false,
            message: "Server Error"
        })
    }


})


module.exports = router;