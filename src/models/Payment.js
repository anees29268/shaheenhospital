const { default: mongoose } = require("mongoose");
import PaymentCategory from "./PaymentCategory";

const paymentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentCat: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "PaymentCategory",
    },
  },
  {
    timestamps: true,
  }
);

const Payment =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

module.exports = Payment;
