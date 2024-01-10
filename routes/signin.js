const express = require('express');
const router = express.Router();

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
                res.status(200).json({
                    message: 'User loggedin successfully',
                    userDetails: {
                        email: user.email,
                        role: user.role,
                        jwtToken: "7ybwkhbhyeadcha"
                    } 
                });
            }
            else {
                res.status(404).json({err_msg: "Incorrect Password"});
            }
        }
    }
    catch(err) {
        res.status(500).json({err_msg: "couldn't login due to API Error"});
    }
})

module.exports = router;