const mongoose = require('mongoose');

const jobsSchema = new mongoose.Schema({
    jobTitle: {type: String, required: true},
    companyName: {type: String, required: true},
    description: {type: String},
    location: {type: String},
    workHours: {type: String},
    salary: {type: String},
    contactDetails: {type: String},
    // skills: [],
    postedOn: {type: Date},
    postedBy: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Jobs', jobsSchema);