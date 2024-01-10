const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URI);
        console.log("DB connected successfully");
    }
    catch(err) {
        console.log("DB is unable to connect");
        process.exit(1);
    }
}

module.exports = connectDB;