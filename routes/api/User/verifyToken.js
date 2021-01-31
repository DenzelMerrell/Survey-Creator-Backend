/*
    Endpoint to verify that the users token is correct
    
    If the user already has a token when they open the webpage, verify that the token is valid
    and allow access to the site
*/

const express = require('express');
const { User } = require('../../../Models/Models.js')

const router = express.Router();


router.get('/verifyToken', async (req, res) => {

    const { token } = req.body;

    const tok = await User.findByPk(token);

    if (!tok) {
        res.json({
            success: false,
            message: "User not found"
        })
    }

    res.json({
        success: true,
        message: "Success"
    })
})


module.exports = router;