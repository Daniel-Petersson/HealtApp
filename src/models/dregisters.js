const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phone: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      confirmpassword: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,
      },
      speciality: {
        type: String,
        required: true,
      },
})

const Dregister = new mongoose.model("Dregister", doctorSchema);

module.exports = Dregister;