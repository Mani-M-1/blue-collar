const express = require('express');
const router = express.Router();

// importing "models"
const User = require('../Models/User');



// creating a user 
router.post('/', async (req, res) => {
    try {
        const userFromDb = await User.findOne({email: req.body.email});

        if (!userFromDb) {
            const user = new User(req.body);

            await user.save();

            res.status(200).json({message: 'User created successfully'});
        }
        else {
            res.status(404).json({err_msg: 'User already exists'});
        }
    }
    catch(err) {
        res.status(500).json({err_msg: 'user is unable to crete due to API error'})
    }
})

module.exports = router;