const { default: mongoose } = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cnic: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "non-active"],
    },

    address: {
      type: String,
    },
    hiringDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
