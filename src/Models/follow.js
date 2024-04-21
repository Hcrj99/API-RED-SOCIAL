const {Schema, model} = require('mongoose');

const followSchema = Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'user'
    },
    followed: {
        type: Schema.ObjectId,
        ref: 'user'
    },
    createat: {
        type: Date,
        default: Date.now
    }

});


module.exports = model('Follow', followSchema, 'follows');