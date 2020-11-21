const mongoose = require('mongoose');
const patientsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        noOfmedicins: {
            type: Number,
            required: true
        },
        medicins: [
            {
                name: String,
                quantity: String
            }
        ]
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('patients', patientsSchema);
