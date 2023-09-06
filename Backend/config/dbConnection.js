const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Connect to Mongoose/mydb");
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDb;