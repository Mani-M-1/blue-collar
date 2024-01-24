const express = require('express');
const router = express.Router();
// const jwt = require("jsonwebtoken");


// importing required models
const User = require('../Models/User');


// login api 
router.post('/', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if (!user) {
            res.status(404).json({err_msg: "User doesn't exists, please signup before you login!!!"});
        }
        else {
            if (user.password === req.body.password) {

                // const jwtToken = jwt.sign(
                //     {
                //         id: user._id
                //     }, 
                //     process.env.JWT_SEC,
                //     {
                //         expiresIn: "3d"
                //     }
                // )
                

                res.status(200).json({
                    message: 'User loggedin successfully',
                    userDetails: {
                        userId: user._id,
                        email: user.email,
                        // jwtToken
                    } 
                });
            }
            else {
                res.status(404).json({err_msg: "Incorrect Password"});
            }
        }
    }
    catch(err) {
        res.status(500).json({err_msg: "API Error occured while trying to login"});
    }
})

module.exports = router;