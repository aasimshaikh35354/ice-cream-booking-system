const express = require("express");
const {
  getAllDeliveryBoys,
  addDeliveryBoy,
  updateDeliveryBoy,
  deleteDeliveryBoy,
} = require("../controllers/deliveryBoyController");

const router = express.Router();

router.get("/", getAllDeliveryBoys);
router.post("/", addDeliveryBoy);
router.put("/:id", updateDeliveryBoy);
router.delete("/:id", deleteDeliveryBoy);

module.exports = router;
