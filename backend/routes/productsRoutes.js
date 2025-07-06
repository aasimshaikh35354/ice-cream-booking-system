const {
  addProducts,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
} = require("../controllers/productsControllers");
const express = require("express");
const router = express.Router();

router.route("/").post(addProducts).get(getProducts);

router.route("/category/:categoryId").get(getProductsByCategory);
router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
