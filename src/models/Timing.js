const { default: mongoose } = require("mongoose");
import Doctor from "./Doctor";

const DoctorAppointmentSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    roomNo: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    daysOfWeek: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Timing =
  mongoose.models.Timing || mongoose.model("Timing", DoctorAppointmentSchema);

module.exports = Timing;
