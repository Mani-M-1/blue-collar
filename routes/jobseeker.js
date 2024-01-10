const express = require('express');
const router = express.Router();

const User = require('../Models/User');

// posting job 
router.put('/applyJob/:userId/:jobId', async (req, res) => {
    const {userId, jobId} = req.params;

    try {
        await User.updateOne({_id: userId}, {
            $addToSet: {
                jobsSeeked: jobId
            }
        })
        res.status(200).json({message: "Job applied successfully"});
    }
    catch(err) {
        res.status(500).json({err_msg: "API Error occured while applying for job"});
    }
})

// get all jobs of a job provider
router.get('/jobsApplied/:userId', async (req, res) => {
    try {
        const userDetails = await User.findOne({_id: req.params.userId});

        res.status(200).json({
            message: "Jobs fetched successfully", 
            jobsApplied: userDetails.jobsSeeked
        });
    }
    catch(err) {
        res.status(500).json({err_msg: "API Error occured while fetching the applied jobs"});
    }
})

module.exports = router;