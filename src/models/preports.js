// name
// healthProblem
// medications
// medicalHistory
// otherDetails

const mongoose = require('mongoose');

const preportsSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
    },
    healthProblem:{
        type: String,
        required: true,
    },
    medications:{
        type: String,
        required: true,
    },
    medicalHistory:{
        type: String,
        required: true,
    },
    otherDetails:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        default: "pending",
    },

})

const Preports = new mongoose.model("Preports", preportsSchema);

module.exports = Preports;
