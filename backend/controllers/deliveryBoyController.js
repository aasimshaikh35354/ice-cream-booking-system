const DeliveryBoy = require("../models/deliveryBoyModel");

// Get all delivery boys
const getAllDeliveryBoys = async (req, res) => {
  try {
    const deliveryBoys = await DeliveryBoy.find();
    res.status(200).json(deliveryBoys);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Add new delivery boy
const addDeliveryBoy = async (req, res) => {
  try {
    const { name, phone, status } = req.body;
    const deliveryBoy = new DeliveryBoy({ name, phone, status });
    await deliveryBoy.save();
    res
      .status(201)
      .json({ message: "Delivery boy added successfully", deliveryBoy });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update delivery boy
const updateDeliveryBoy = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBoy = await DeliveryBoy.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBoy)
      return res.status(404).json({ error: "Delivery boy not found" });
    res.status(200).json({ message: "Updated successfully", updatedBoy });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete delivery boy
const deleteDeliveryBoy = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBoy = await DeliveryBoy.findByIdAndDelete(id);
    if (!deletedBoy)
      return res.status(404).json({ error: "Delivery boy not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllDeliveryBoys,
  addDeliveryBoy,
  updateDeliveryBoy,
  deleteDeliveryBoy,
};
