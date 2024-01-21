const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['jobprovider', 'jobseeker']},
    // jobsCreated: [{jobId: mongoose.Schema.ObjectId, ref: 'Jobs'}], // only for provide 
    jobsSeeked: [{type: mongoose.Schema.ObjectId, ref: 'Jobs'}] // only for seeker
    // jobsSeeked: ["658b21c2d4fba2c0ae2c2c8d", "658b21c2d4fba2c0ae2c2c8d"] // only for seeker
})

module.exports = mongoose.model('User', userSchema);