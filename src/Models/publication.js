const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const publicationSchema = Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'user'
    },
    text: {
        type: String,
        require: true
    },
    file: {
        type: String
    },
    createat: {
        type: Date,
        default: Date.now
    }
});

publicationSchema.pligin(mongoosePaginate);

module.exports = model('publication', publicationSchema, 'publications');