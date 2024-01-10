const mongoose = require('mongoose');

const jobsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    companyName: {type: String, required: true},
    experience: {type: String},
    skills: [],
    createdOn: {type: Date},
    postedBy: {type: mongoose.Schema.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Jobs', jobsSchema)