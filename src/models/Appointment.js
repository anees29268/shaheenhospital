const { default: mongoose } = require("mongoose");
import Doctor from "./Doctor";
import Patient from "./Patient";

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Patient",
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Doctor",
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    token: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
