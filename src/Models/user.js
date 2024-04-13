const { schema, model } = require('mongoose');

const userSchema = schema({
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