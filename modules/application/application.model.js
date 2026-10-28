const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
    hired: Boolean,
    //candidate relation
    candidate: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Candidate'
    },
    //job relation
    job: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Job'
    }
});

module.exports = mongoose.model('Application', ApplicationSchema);
