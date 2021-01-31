/*
    Login endpoint for verifying and giving an existing user access to their account

*/

const express = require('express');
const { User, UserSession } = require('../../../Models/Models.js');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/login', async (req, res) => {
    console.log("LOGIN REQUEST");
    /*
        req body will contain:
        username
        password
    */
    const { username, password } = req.body;

    // Check if username or password is blank

    if (!username) {
        res.json({
            success: false,
            message: "Username cannot be blank"
        })
    }
    if (!password) {
        res.json({
            success: false,
            message: "Password cannot be blank"
        })
    }

    // Check that UN exist

    let users = await User.findAll({
        where: {
            username: `${username}`
        }
    })


    if (users.length === 0) {
        res.json({
            success: false,
            message: "Username not found"
        })
    }

    //There should not be more than one user with the same username

    if (users.length > 1) {
        res.json({
            success: false,
            message: "Error => Server Error"
        })
    }

    const user = users[0];

    // Verify password   

    let validPw;

    try {
        console.log("CHECKING IF PASSWORD IS VALID");
        // const user = await User.findOne({
        //     where: {
        //         username: `${username}`
        //     },
        //     attributes: ['password']
        // })

        const hashedPassword = user.dataValues.password;

        console.log("Hashed Password: ", hashedPassword);

        await bcrypt.compare(password, hashedPassword, async function (err, result) {

            if (err) {
                console.log("Bcrypt Error: ", err);
                return false;
            }

            console.log("Result: ", result);

            if (result) {

                // Open the user session

                let sessions = await UserSession.findAll({
                    where: {
                        userId: `${user.userId}`
                    }
                })
                console.log("SESSION", sessions);
                sessions[0].openSession = true;

                await sessions[0].save();

                //Send back the token to be stored int he users local storage

                res.json({
                    success: true,
                    message: "success",
                    token: user.userId,

                })
            }
            else {
                res.json({
                    success: false,
                    message: "ERROR => Incorrect Passsword",
                })
            }
        });
    }
    catch (err) {
        console.log("Error: ", err);
        res.json({
            success: false,
            message: 'Server Error'
        })
    }



})


module.exports = router;