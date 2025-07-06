const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Processing", "Completed", "Failed"],
    default: "Processing",
  },
  address: {
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  deliveryBoy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeliveryBoy",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
