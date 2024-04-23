const {Schema, model} = require('mongoose');
const monggosePaginate = require('mongoose-paginate-v2');

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

followSchema.plugin(monggosePaginate);

module.exports = model('Follow', followSchema, 'follows');