require('dotenv').config()
const { mongoose } = require("mongoose")

const mongooseUri = process.env.MONGO_URI;

const connectToMongo = async () =>{

    try {
        await mongoose.connect(mongooseUri);
        console.log("connected successfully...");
    } catch (error) {
        console.log("Internal server error.")
        console.error(error)
        
    }
}

module.exports = connectToMongo;