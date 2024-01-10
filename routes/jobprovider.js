const express = require('express');
const router = express.Router();

const Jobs = require('../Models/Jobs');

// posting job 
router.post('/postJob', async (req, res) => {
    try {
        const job =  new Jobs({
            title: req.body.title,
            companyName: req.body.companyName,
            experience: req.body.experience,
            skills: req.body.skills,
            createdOn: new Date(req.body.createdOn),
            postedBy: req.body.postedBy,
        }) 

        await job.save();
        res.status(200).json({message: "Job posted successfully"});
    }
    catch(err) {
        res.status(500).json({err_msg: "Job didn't created due to API Error"});
    }
})

// get all jobs of a job provider
router.get('/jobsProvided/:userId', async (req, res) => {
    try {
        const jobs = await Jobs.find({postedBy: req.params.userId});

        res.status(200).json({message: "Jobs fetched successfully", jobs});
    }
    catch(err) {
        res.status(500).json({err_msg: "API Error occured while fetching the jobs"});
    }
})

module.exports = router;