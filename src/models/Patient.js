const { default: mongoose } = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    cnic: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
    },
    bloodGroup: {
      type: String,
    },
    age: {
      type: Number,
      required: true,
    },

    case: {
      type: String,
      required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    contact: {
      type: String,
    },
    address: {
      type: String,
    },
    remarks: {
      type: String,
    },
    addedBy: {
      type: String,
    },
    tokenNo: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Patient =
  mongoose.models.Patient || mongoose.model("Patient", patientSchema);

module.exports = Patient;
