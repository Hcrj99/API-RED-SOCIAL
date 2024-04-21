const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String
    },
    bio: {
        type: String,
    },
    nick: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "role_user"
    },
    image: {
        type: String,
        default: "Default.png"
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

//Monggose paginate
userSchema.plugin(mongoosePaginate);

module.exports = model('user', userSchema, 'users');