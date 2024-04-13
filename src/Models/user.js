const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String
    },
    nick : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        default : "role_user"
    },
    image : {
        type : String,
        default : "Default.png"
    },
    createAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = model('user', userSchema, 'users');