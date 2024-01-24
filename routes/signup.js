const express = require('express');
const router = express.Router();

// importing "models"
const User = require('../Models/User');



// creating a user 
router.post('/', async (req, res) => {
    try {
        const userFromDb = await User.findOne({email: req.body.email});

        if (!userFromDb) { 
            const user = new User({
                email: req.body.email,
                password: req.body.password
            });

            await user.save();

            res.status(200).json({message: 'User created successfully'});
        }
        else {
            res.status(404).json({err_msg: 'User already exists'});
        }
    }
    catch(err) {
        res.status(500).json({err_msg: 'User is unable to crete due to API error'})
    }
})

// adding role to user's data 
router.put('/addRole/:userId', async (req, res) => {
    const {userId} = req.params;

    try {
        const userFromDb = await User.findOne({_id: userId});

        if (!userFromDb) { 
            res.status(404).json({err_msg: "User doesn't exists"});
        }
        else {
            await User.updateOne(
                {
                    _id: userId
                },
                {
                    $set: {role: req.body.role}
                },
                {
                    new: true
                }
            )

            const user = await User.findOne({_id: userId});
    
            res.status(200).json({
                message: 'Role added successfully',
                role: user.role
            })
        }
    }
    catch(err) {
        res.status(500).json({err_msg: "API Error occured while adding role to user"});
    }
})

module.exports = router;