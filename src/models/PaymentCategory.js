const { default: mongoose } = require("mongoose");

const paymentCatSchema = new mongoose.Schema(
  {
    title: {
      type: String,
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

const PaymentCategory =
  mongoose.models.PaymentCategory ||
  mongoose.model("PaymentCategory", paymentCatSchema);

module.exports = PaymentCategory;
