`use strict`;
const mongoose = require("mongoose");

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
// Mongodb connection established here if mongodb is runing and connection string is correct //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//
//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\//\\
module.exports = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        console.log(`Mongodb connected....!`);
        return true;
    } catch(error) {
        console.log(`Mongodb connection error....!`, error);
        process.exit(1);
    }
};

