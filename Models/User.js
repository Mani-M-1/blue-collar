const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true, enum: ['jobprovider', 'jobseeker']},
    // jobsCreated: [{jobId: mongoose.Schema.ObjectId, ref: 'Jobs'}], // only for provide 
    jobsSeeked: [{type: mongoose.Schema.ObjectId, ref: 'Jobs'}] // only for seeker
})

module.exports = mongoose.model('User', userSchema);