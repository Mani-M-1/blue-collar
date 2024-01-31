const express = require('express');
const router = express.Router();

const Jobs = require('../Models/Jobs');
const User = require('../Models/User');



// posting job 
router.post('/postJob', async (req, res) => {
    try {
        const userFromDb = await User.findOne({_id: req.body.postedBy});


        if (!userFromDb) {
            res.status(404).json({err_msg: "User doesn't exist"});
        }
        else {
            if (userFromDb.role === "jobprovider") {

                const job =  new Jobs({
                    jobTitle: req.body.jobTitle,
                    companyName: req.body.companyName,
                    description: req.body.description,
                    location: req.body.companyName,
                    workHours: req.body.workHours,
                    salary: req.body.salary,
                    contactDetails: req.body.contactDetails,
                    jobImage: req.body.jobImage,
                    postedOn: new Date(),
                    postedBy: req.body.postedBy,
                }) 
        
                await job.save();
                res.status(200).json({message: "Job posted successfully"});
            }
            else {
                res.status(404).json({err_msg: "User is not a Job Provider"});
            }
        }
    }
    catch(err) {
        res.status(500).json({err_msg: "Job didn't created due to API Error"});
    }
})

// get all jobs of a job provider
router.get('/jobsProvided/:userId', async (req, res) => {
    try {
        const jobs = await Jobs.find({postedBy: req.params.userId});

        res.status(200).json({message: "Jobs fetched successfully", jobs, numberOfJobsPosted: jobs.length});
    }
    catch(err) {
        res.status(500).json({err_msg: "API Error occured while fetching the jobs"});
    }
})

// updating a particular job of a specific jobprovider 
router.put('/updateJobDetails/:jobId', async (req, res) => {
    try {
        const {jobId} = req.params;

        await Jobs.updateOne(
            {
                _id: jobId
            },
            {
                $set: req.body
            },
            {
                new: true
            }
        )

        const updatedJob = await Jobs.findOne({_id: jobId});

        res.status(200).json({
            message: "Job updated successfully",
            updatedJobDetails: updatedJob
        })
    }
    catch(err) {
        res.status(500).json({err_msg: "API Error occured while updating the job details"});
    }
})


// deleting specific job by id
router.delete('/deleteJob/:jobId', async (req, res) => {
    try {
        const {jobId} = req.params;

        await Jobs.deleteOne({_id: jobId});

        res.status(200).json({
            message: "Job deleted successfully"
        })
    }
    catch(err) {
        res.status(500).json({err_msg: "API Error occured while deleting the job"});
    }
})

module.exports = router;