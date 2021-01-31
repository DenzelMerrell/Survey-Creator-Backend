/*
    Signup endpoint for creating a new user account
*/

const express = require('express');
const { User, UserSession } = require('../../../Models/Models.js');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/signup', async (req, res) => {
    /*
        req body will contain:
        username
        password
    */
    const { username, password } = req.body;

    //Verify username and password are not blank

    if (!username) {
        res.json({
            success: false,
            message: 'Username Cannot Be Blank'
        })
    }
    if (!password) {
        res.json({
            success: false,
            message: 'Password Cannot Be Blank'
        })
    }

    //Verify that username does not already exist

    const users = await User.findAll({
        where: {
            username: `${username}`
        }
    })

    if (users.length != 0) {
        //Username already exists
        res.json({
            success: false,
            message: 'Username Taken'
        })
    }

    //Hash password

    let hashedPassword;

    try {
        const saltRounds = 10;

        await bcrypt.hash(password, saltRounds, async function (err, hash) {

            if (err) {
                console.log("Bcrypt Error: ", err);
                return false;
            }
            console.log("Hash: ", hash);

            //Store user

            //Create the new user

            const newUser = User.build({
                username: `${username}`,
                password: `${hash}`
            })

            console.log("USER: ", newUser);

            //Save the user account

            await newUser.save();

            //Create and open a new user session

            const newSession = UserSession.build({
                openSession: true,
                userId: newUser.userId
            })

            //Save the session

            await newSession.save();

            console.log("SESSION: ", newSession);

            res.json({
                success: true,
                message: 'Success',
                token: newUser.userId
            })
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