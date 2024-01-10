const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');




// importing routes 
const signupRoute = require('./routes/signup');
const signinRoute = require('./routes/signin');
const jobproviderRoute = require('./routes/jobprovider');
const jobseekerRoute = require('./routes/jobseeker');





dotenv.config(); // configuring the ".env" file 


const port = 8080;

const connectDB = require('./connectDB'); // importing "database connection" function

connectDB(); // connecting db

// creating app 
const app = express();


// using required "middlewares"
app.use(express.json());
app.use(cors());







// using required routes
app.use('/signup', signupRoute);
app.use('/signin', signinRoute);
app.use('/jobprovider', jobproviderRoute);
app.use('/jobseeker', jobseekerRoute);







// starting serve
app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
});