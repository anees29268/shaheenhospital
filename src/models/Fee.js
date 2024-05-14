const { default: mongoose } = require("mongoose");
import Payment from "./Payment";
import Patient from "./Patient";

const feeSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    desc: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Fee = mongoose.models.Fee || mongoose.model("Fee", feeSchema);

module.exports = Fee;
