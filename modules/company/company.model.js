// import the mongoose
const mongoose = require('mongoose');
// get the schema class from mongoose
const Schema = mongoose.Schema;
// create an new object of the schema
const CompanySchema = new Schema({
    name: {
        required: true,
        type: String
    },
    city: String,
    address: String,
    candidates: [{
        type: Schema.Types.ObjectId,
        ref: 'Candidate'
    }],
    jobs: [{
        type: Schema.Types.ObjectId,
        ref: 'Job'
    }],
    users: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

module.exports = mongoose.model('Company', CompanySchema);
