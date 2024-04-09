const mongoose = require("mongoose");


const connectionDB = async() => { 
    try {
        await mongoose.connect("mongodb://localhost:27017/red_social");
        console.log("->Connect with Data Base: red_social")
    }
    catch(error){
        console.log("*****Error conect with Data Base: " + error);
        throw new Error("*****No connection with data base*****");
    }
}

module.exports = connectionDB;