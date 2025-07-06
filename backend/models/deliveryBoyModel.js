const mongoose = require("mongoose");

const deliveryBoySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

const DeliveryBoy = mongoose.model("DeliveryBoy", deliveryBoySchema);

module.exports = DeliveryBoy;
