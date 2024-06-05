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
    amount: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed"],
    },
    desc: {
      type: String,
    },
    report: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Fee = mongoose.models.Fee || mongoose.model("Fee", feeSchema);

module.exports = Fee;
